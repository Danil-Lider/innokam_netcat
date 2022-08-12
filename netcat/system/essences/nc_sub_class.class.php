<?php

class nc_Sub_Class extends nc_Essence {

    protected $db;
    private $_current_id;

    const MAX_KEYWORD_LENGTH = 64;

    protected $ctpl_cache;
    protected $subdivision_cache;
    protected $container_cache = array();
    protected $subdivision_first_checked_cache;

    /**
     * Constructor function
     */
    public function __construct() {
        // load parent constructor
        parent::__construct();

        // system superior object
        $nc_core = nc_Core::get_object();
        // system db object
        if (is_object($nc_core->db)) {
            $this->db = $nc_core->db;
        }

        $this->register_event_listeners();
    }

    /**
     * Обработчики для обновления и сброса кэша
     */
    protected function register_event_listeners() {
        $event = nc_core::get_object()->event;
        $clear_cache = array($this, 'clear_cache');
        $event->add_listener(nc_event::AFTER_INFOBLOCK_UPDATED, $clear_cache);
        $event->add_listener(nc_event::AFTER_INFOBLOCK_ENABLED, $clear_cache);
        $event->add_listener(nc_event::AFTER_INFOBLOCK_DISABLED, $clear_cache);
        $event->add_listener(nc_event::AFTER_INFOBLOCK_DELETED, $clear_cache);
    }

    /**
     * @param string $query_condition
     * @param array $data
     * @return array
     */
    protected function set_cache($query_condition, array $data) {
        // Кэш для выборки по родительскому контейнеру $this->container_cache
        // хранится в многомерном массиве:
        // — первый ключ равен условию выборки (для инфоблоков разделов — ID раздела;
        //   для сквозных инфоблоков — строка с параметрами запроса, см. метод ...) —
        //   передаётся в этот метод в $query_condition
        // — второй ключ равен идентификатору контейнера (Parent_Sub_Class_ID инфоблока)

        if (!isset($this->container_cache[$query_condition])) {
            // это позволит определить, что такой запрос уже был
            $this->container_cache[$query_condition] = array();
        }

        $processed_container_ids = array();
        foreach ($data as $row) {
            $id = $row['Sub_Class_ID'];
            $container_id = $row['Parent_Sub_Class_ID'];

            // это то же, что делает метод set_data()
            $this->data[$id] = $row;
            $this->data[$id]['_nc_final'] = 0;

            // установить все данные...
            $this->get_by_id($id);

            // Этот метод сбрасывает кэш для контейнера, если в $data есть данные
            // для этого контейнера:
            if (!isset($processed_container_ids[$container_id])) {
                $this->container_cache[$query_condition][$container_id] = array();
                $processed_container_ids[$container_id] = true;
            }

            $this->container_cache[$query_condition][$container_id][] = &$this->data[$id];

        }

        return $this->container_cache[$query_condition];
    }

    /**
     * @param $area_keyword
     * @param array $routing_data
     * @return string
     */
    protected function get_area_container_cache_key($area_keyword, array $routing_data) {
        unset($routing_data['variables']);
        return "$area_keyword;" . join(';', $routing_data);
    }

    /**
     * @param int $id
     * @throws Exception
     */
    protected function load_all_by_subdivision_id($id) {
        $rows = (array)$this->db->get_results(
            "SELECT b.*, 
                    c.`System_Table_ID` AS sysTbl,
                    IF(`b`.`Class_Template_ID` != 0 AND `b`.`Class_ID` != `b`.`Class_Template_ID`, `b`.`Class_Template_ID`, `c`.`Main_ClassTemplate_ID`) AS `Class_Template_ID`       
               FROM `Sub_Class` AS b
               LEFT JOIN `Class` AS c ON b.`Class_ID` = c.`Class_ID`
              WHERE b.`Subdivision_ID` = '" . (int)$id . "'
              ORDER BY b.`Checked`, b.`Priority`",
            ARRAY_A);
        return $this->set_cache($id, $rows);
    }

    /**
     * @param int $subdivision_id
     * @param bool $reset
     */
    public function get_all_by_subdivision_id($subdivision_id, $reset = false) {
        $infoblocks_by_container = $this->load_all_by_subdivision_id($subdivision_id);
        $result = array();
        foreach ((array)$infoblocks_by_container as $row) {
            $result = array_merge($result, $row);
        }
        return $result;
    }

    /**
     * Get subclass data with system table flag from `Class` table
     *
     * @param int $subdivision_id Subdivision_ID, if not set - use current value in query
     * @param bool $reset reset stored data in the static variable
     *
     * @return array|bool subclass data associative array
     */
    public function get_by_subdivision_id($subdivision_id = 0, $reset = false) {
        $nc_core = nc_Core::get_object();
        $subdivision_id = (int)$subdivision_id;
        if (!$subdivision_id && is_object($nc_core->subdivision)) {
            $subdivision_id = $nc_core->subdivision->get_current("Subdivision_ID");
        }

        if (!$subdivision_id) {
            return false;
        }

        if ($reset || !isset($this->container_cache[$subdivision_id])) {
            // Загружаем все уровни (вложенные контейнеры), так как для вывода
            // содержимого всё равно потребуются данные уровнем глубже
            $this->load_all_by_subdivision_id($subdivision_id);
        }

        return isset($this->container_cache[$subdivision_id][0])
            ? $this->container_cache[$subdivision_id][0]
            : array(); // до Netcat 6 возвращался null
    }

    protected function get_current_page_routing_data() {
        return array(
            'site_id' => (int)$GLOBALS['catalogue'] ?: null,
            'folder_id' => (int)$GLOBALS['sub'] ?: null,
            'infoblock_id' => (int)nc_array_value($GLOBALS, 'cc') ?: null,
            'object_id' => (int)nc_array_value($GLOBALS, 'message') ?: null,
            'action' => nc_array_value($GLOBALS, 'action', 'index'),
        );
    }

    /**
     * Пока не является частью публичного API: возможен рефакторинг.
     * Поведение отличается от get_by_subdivision_id():
     *  get_by_subdivision_id() возвращает все инфоблоки
     *  этот метод возвращает в режиме просмотра только включённые инфоблоки
     *
     * @param string $area_keyword
     * @param array|null $routing_data массив с информацией о текущей странице (как в nc_page::get_routing_result)
     * @param int $container_id
     * @param bool $reset
     * @return array
     */
    public function get_by_area_keyword($area_keyword, $routing_data = array(), $container_id = 0, $reset = false) {
        if (empty($routing_data)) { // например, режим редактирования
            $routing_data = $this->get_current_page_routing_data();
        }

        $cache_key = $this->get_area_container_cache_key($area_keyword, $routing_data);

        $reload =
            $reset || // запрошена перезагрузка
            !isset($this->container_cache[$cache_key][$container_id]) || // нет необходимых данных
            !isset($this->container_cache[$cache_key][0]); // запрос к корневому уровню загружает данные полностью

        if ($reload) {
            $nc_core = nc_core::get_object();
            $db = $nc_core->db;

            $container_id = (int)$container_id;
            $component_ids = $this->get_main_content_component_ids($routing_data);
            $sub = nc_array_value($routing_data, 'folder_id');
            $parent_subdivision_ids = $this->get_parent_subdivision_ids_for_area_conditions($sub);

            // Для $container_id = 0 загружаем все блоки в области (они понадобятся)
            $where_container = $container_id ? "AND `block`.`Parent_Sub_Class_ID` = $container_id" : '';
            $where_enabled = $nc_core->admin_mode ? '' : 'AND `block`.`Checked` = 1';

            $query =
                "SELECT DISTINCT `block`.*, IF(`block`.`Class_Template_ID` != 0 AND `block`.`Class_ID` != `block`.`Class_Template_ID`, `block`.`Class_Template_ID`, `class`.`Main_ClassTemplate_ID`) AS `Class_Template_ID`
                   FROM `" . $this->essence . "` AS `block`

                        LEFT JOIN `Sub_Class_AreaCondition_Class_Exception` AS `not_component` 
                               ON (
                                    `block`.`Sub_Class_ID` = `not_component`.`Sub_Class_ID` 
                                    AND `not_component`.`Class_ID` IN ($component_ids)
                                  )

                        LEFT JOIN `Sub_Class_AreaCondition_Class` AS `component` 
                               ON (`block`.`Sub_Class_ID` = `component`.`Sub_Class_ID`)

                        LEFT JOIN `Sub_Class_AreaCondition_Subdivision_Exception` AS `not_sub` 
                               ON (
                                    `block`.`Sub_Class_ID` = `not_sub`.`Sub_Class_ID`
                                    {$this->generate_area_excluded_subdivision_join_condition($sub, $parent_subdivision_ids)}
                                  )

                        LEFT JOIN `Sub_Class_AreaCondition_Subdivision` AS `sub` 
                                   ON (`block`.`Sub_Class_ID` = `sub`.`Sub_Class_ID`)

                        LEFT JOIN `Sub_Class_AreaCondition_Message` AS `object` 
                               ON (`block`.`Sub_Class_ID` = `object`.`Sub_Class_ID`)
                               
                        LEFT JOIN `Class` AS `class`
                               ON (`block`.`Class_ID` = `class`.`Class_ID`)

                  WHERE `block`.`Catalogue_ID` = " . (int)$routing_data['site_id'] . "
                    AND `block`.`AreaKeyword` = '" . $db->escape($area_keyword) . "'
                    $where_container
                    $where_enabled
                    {$this->generate_area_action_condition($routing_data)}
                    {$this->generate_area_component_condition($component_ids)}
                    {$this->generate_area_subdivision_condition($sub, $parent_subdivision_ids)}
                    {$this->generate_area_object_condition($routing_data)}
                    {$this->generate_sub_class_checked_condition()}
                  ORDER BY `block`.`Priority`";
            $raw_data = (array)$db->get_results($query, ARRAY_A);
            $this->set_cache($cache_key, $raw_data);
        }

        return isset($this->container_cache[$cache_key][$container_id])
                    ? $this->container_cache[$cache_key][$container_id]
                    : array();
    }

    /**
     * Вспомогательный метод для получения ID компонентов в основной контентной
     * области по массиву с данными о запрошенной странице
     * @param array $routing_data
     * @return string ID компонентов через запятую — для использования в условии IN()
     *
     */
    protected function get_main_content_component_ids(array $routing_data) {
        $action = nc_array_value($routing_data, 'action', 'index');
        $component_ids = array();
        if ($action === 'index' && !$routing_data['infoblock_id'] && $routing_data['folder_id']) {
            $main_content_blocks = $this->get_by_subdivision_id($routing_data['folder_id']) ?: array();
            foreach ($main_content_blocks as $main_content_block) {
                $component_ids[] = $main_content_block['Class_ID'];
            }
        } else if ($routing_data['infoblock_id']) {
            $component_ids[] = $this->get_by_id($routing_data['infoblock_id'], 'Class_ID');
        }
        return join(', ', $component_ids) ?: '0';
    }

    /**
     * @param int|null $sub
     * @return string
     */
    protected function get_parent_subdivision_ids_for_area_conditions($sub) {
        $parent_subdivision_ids = array();
        if ($sub) {
            $parent_tree = (array)nc_core::get_object()->subdivision->get_parent_tree($sub);
            foreach ($parent_tree as $parent) {
                if (!empty($parent['Subdivision_ID'])) {
                    $parent_subdivision_ids[] = $parent['Subdivision_ID'];
                }
            }
        }
        return join(', ', $parent_subdivision_ids) ?: '0';
    }

    /**
     * @param array $routing_data
     * @return string
     */
    protected function generate_area_action_condition(array $routing_data) {
        $action = nc_array_value($routing_data, 'action', 'index');
        if (!in_array($action, array('add', 'delete', 'edit', 'full', 'index', 'search', 'subscribe'))) {
            return '';
        }
        return " AND `block`.`AreaCondition_Action_$action` = 1 ";
    }

    /**
     * @param string $component_ids
     * @return string
     */
    protected function generate_area_component_condition($component_ids) {
        // (1) компоненты, которые не должны находиться в основной контентной области, чтобы блок был показан:
        $sql_condition = ' AND `not_component`.`Condition_ID` IS NULL';
        // (2) компоненты, которые должны быть в основной контентной области:
        $sql_condition .= " AND (`component`.`Condition_ID` IS NULL OR `component`.`Class_ID` IN ($component_ids)) ";

        return $sql_condition;
    }

    /**
     * @param int|null $sub
     * @param string $parent_subdivision_ids
     * @return string
     */
    protected function generate_area_excluded_subdivision_join_condition($sub, $parent_subdivision_ids) {
        if (!$sub) {
            return '';
        }

        return "AND (" .
               "`not_sub`.`Subdivision_ID` = $sub " .
               " OR (`not_sub`.`Subdivision_ID` IN ($parent_subdivision_ids) AND `not_sub`.`IncludeChildren` = 1)" .
               ")";
    }

    /**
     * @param int|null $sub
     * @param string $parent_subdivision_ids
     * @return string
     */
    protected function generate_area_subdivision_condition($sub, $parent_subdivision_ids) {
        if (!$sub) {
            return '';
        }

        return " AND `not_sub`.`Condition_ID` IS NULL" .
               " AND (" .
               "`sub`.`Condition_ID` IS NULL" .
               " OR `sub`.`Subdivision_ID` = $sub" .
               " OR (`sub`.`Subdivision_ID` IN ($parent_subdivision_ids) AND `sub`.`IncludeChildren` = 1)" .
               ")";
    }

    /**
     * @param array $routing_data
     * @return string
     */
    protected function generate_area_object_condition(array $routing_data) {
        if (empty($routing_data['object_id']) || empty($routing_data['infoblock_id'])) {
            return '';
        }

        $component_id = $this->get_by_id($routing_data['infoblock_id'], 'Class_ID');

        return " AND (`object`.`Condition_ID` IS NULL OR (" .
               "`object`.`Class_ID` = $component_id AND `object`.`Message_ID` = $routing_data[object_id]" .
               "))";
    }

    /**
     * @return string
     */
    protected function generate_sub_class_checked_condition() {
        // Выключенные блоки должны быть видны только в режиме редактирования
        return nc_Core::get_object()->admin_mode ? null : ' AND `block`.`Checked` = 1';
    }

    /**
     * Пока не является частью публичного API: возможен рефакторинг.
     * Поведение отличается от get_by_subdivision_id():
     *  get_by_subdivision_id() возвращает все инфоблоки
     *  этот метод возвращает в режиме просмотра только включённые инфоблоки
     *
     * Возвращает блоки в контейнере с указанным идентификатором
     * Для блоков в области с учётом условий можно также использовать метод
     * get_by_area_keyword с указанием ID родительского контейнера.
     *
     * @param int $container_id
     * @param bool $reset
     * @return array
     *
     * @throws InvalidArgumentException
     */
    public function get_by_container_id($container_id, $reset = false) {
        $container_id = (int)$container_id;
        if (!$container_id) {
            // без указания родителя не работает
            throw new InvalidArgumentException('$container_id must have a non-zero value');
        }

        $area_keyword = $this->get_by_id($container_id, 'AreaKeyword');
        if ($area_keyword) {
            return $this->get_by_area_keyword($area_keyword, $nc_core = nc_core::get_object()->page->get_routing_result(), $container_id, $reset);
        }

        $already_cached = false;
        if (!$reset) {
            foreach ($this->container_cache as $condition => $rows) {
                if (isset($this->container_cache[$condition][$container_id])) {
                    $already_cached = $this->container_cache[$condition][$container_id];
                    break;
                }
            }
        }

        if ($reset || !$already_cached) {
            $where_enabled = nc_core::get_object()->admin_mode ? '' : 'AND `Checked` = 1';
            $raw_data = (array)nc_db()->get_results(
                "SELECT *, IF(`b`.`Class_Template_ID` != 0 AND `b`.`Class_ID` != `b`.`Class_Template_ID`, `b`.`Class_Template_ID`, `c`.`Main_ClassTemplate_ID`) AS `Class_Template_ID` 
                   FROM `Sub_Class` 
                   LEFT JOIN `Class` AS `c` ON `b`.`Class_ID` = `c`.`Class_ID`
                  WHERE `Parent_Sub_Class_ID` = $container_id
                        $where_enabled 
                  ORDER BY `Priority`",
                ARRAY_A
            );
            $this->set_cache('C', $raw_data);
            $already_cached = isset($this->container_cache['C'][$container_id])
                                    ? $this->container_cache['C'][$container_id]
                                    : array();
        }

        return $already_cached;
    }

    /**
     * Get first 'checked' subclass ID in a subdivision
     */
    public function get_first_checked_id_by_subdivision_id($id = 0, $reset = false) {
        $id = intval($id);

        if (!isset($this->subdivision_first_checked_cache[$id]) || $reset) {
            $this->subdivision_first_checked_cache[$id] = false;

            $subclasses = $this->get_by_subdivision_id($id, $reset);
            if ($subclasses) {
                foreach ($subclasses as $subclass) {
                    if ($subclass['Checked']) {
                        $this->subdivision_first_checked_cache[$id] = $subclass['Sub_Class_ID'];
                        break;
                    }
                }
            }
        }

        return $this->subdivision_first_checked_cache[$id];
    }

    /**
     * Set current subclass data by the id
     *
     * @param int $id subclass id
     * @param bool $reset reset stored data in the static variable
     *
     * @return array|false current cc id that was set
     */

    public function set_current_by_id($id, $reset = false) {

        // validate
        $id = intval($id);
        if (!$id) {
            return ($this->current = array());
        }
        try {
            //if ($id) {
            $this->current = $this->get_by_id($id, "");
            // set additional data
            $this->_current_id = $id;
            // return result
            return $this->current;
            //}
        } catch (Exception $e) {
            nc_print_status($e->getMessage(), 'error');
        }

        // reject
        return false;
    }

    /**
     * @param $id
     * @param string $item
     * @param int $nc_ctpl
     * @param int $reset
     * @param string $type
     * @return null|string|array
     * @throws Exception
     */
    public function get_by_id($id, $item = "", $nc_ctpl = 0, $reset = 0, $type = '') {
        $storage = &$this->ctpl_cache;

        // validate parameters
        $id = intval($id);
        //$nc_ctpl = intval($nc_ctpl);
        // check initialized object
        if (empty($storage[$id][$nc_ctpl]) || $reset) {
            if (!empty($this->data[$id]) && !$reset) {
                $storage[$id][$nc_ctpl] = $this->data[$id];
            }
            else {
                nc_core::get_object()->clear_cache_on_low_memory();
                $this->data[$id] = $this->db->get_row(
                    "SELECT `b`.*, IF(`b`.`Class_Template_ID` != 0 AND `b`.`Class_ID` != `b`.`Class_Template_ID`, `b`.`Class_Template_ID`, `c`.`Main_ClassTemplate_ID`) AS `Class_Template_ID`
                     FROM `" . $this->essence . "` AS `b`
                     LEFT JOIN `Class` AS `c` ON `b`.`Class_ID` = `c`.`Class_ID`
                     WHERE `" . $this->essence . "_ID` = '" . $id . "'",
                    ARRAY_A
                );
                if (empty($this->data[$id])) {
                    //return false;
                    throw new Exception("Sub_Class with id  " . $id . " does not exist");
                }
                $real_value = array('Read_Access_ID', 'Write_Access_ID', 'Edit_Access_ID', 'Delete_Access_ID', 'Checked_Access_ID', 'Moderation_ID', 'Cache_Access_ID', 'Cache_Lifetime');
                foreach ($real_value as $v) {
                    $this->data[$id]['_db_' . $v] = $this->data[$id][$v];
                }
                $storage[$id][$nc_ctpl] = $this->data[$id];
            }

            $storage[$id][$nc_ctpl] = $this->inherit($storage[$id][$nc_ctpl], $nc_ctpl, $type);
        }
        else {
            // Если указан другой тип шаблона, чем тот, что уже был найден, нужно подобрать шаблон заново
            if ($type && $type != $storage[$id][$nc_ctpl]['Type']) {
                $properties_to_reset = array(
                    'FormPrefix', 'FormSuffix', 'RecordTemplate', 'RecordTemplateFull',
                    'TitleTemplate', 'TitleList', 'UseAltTitle', 'AddTemplate', 'EditTemplate',
                    'AddActionTemplate', 'EditActionTemplate', 'SearchTemplate',
                    'FullSearchTemplate', 'SubscribeTemplate', 'Settings',
                    'AddCond', 'EditCond', 'DeleteCond', 'CheckActionTemplate',
                    'DeleteActionTemplate', 'CustomSettingsTemplate',
                    'ClassDescription', 'DeleteTemplate', 'ClassTemplate',
                    'Type', 'File_Mode', 'File_Path', 'File_Hash', 'Real_Class_ID'
                );

                foreach ($properties_to_reset as $k) {
                    unset($storage[$id][$nc_ctpl][$k]);
                }

                $storage[$id][$nc_ctpl] = $this->inherit($storage[$id][$nc_ctpl], $nc_ctpl, $type);
            }
        }

        // if item requested return item value
        if ($item && is_array($storage[$id][$nc_ctpl])) {
            return array_key_exists($item, $storage[$id][$nc_ctpl]) ? $storage[$id][$nc_ctpl][$item] : "";
        }

        return $storage[$id][$nc_ctpl];
    }

    /**
     * Добавляет к переданному массиву $cc_env параметры шаблона компонента.
     * Должно быть передано три аргумента:
     *     array $cc_env — массив с параметрами инфоблока
     *     string|int $nc_ctpl — идентификатор или ключевое слово шаблона компонента
     *     string $type — тип шаблона компонента (значение в поле Class.Type)
     *
     * @param $cc_env
     * @return null
     */
    protected function inherit($cc_env) {
        if (!$cc_env['Class_ID']) {
            // контейнер: наследовать нечего
            return $cc_env;
        }

        $args = func_get_args();
        if (count($args) !== 3) {
            trigger_error(__METHOD__ . ' requires 3 arguments', E_USER_WARNING);
        }
        list($cc_env, $nc_ctpl, $type) = func_get_args();

        $nc_core = nc_Core::get_object();

        if (empty($cc_env)) {
            global $perm;
            // error message
            if ($perm instanceof Permission && $perm->isSupervisor()) {
                // backtrace info
                $debug_backtrace_info = debug_backtrace();
                // choose error
                if (isset($debug_backtrace_info[2]['function']) && $debug_backtrace_info[2]['function'] == "nc_objects_list") {
                    // error info for the supervisor
                    trigger_error(sprintf(NETCAT_FUNCTION_OBJECTS_LIST_CC_ERROR, $debug_backtrace_info[2]['args'][1]), E_USER_WARNING);
                }
                else {
                    // error info for the supervisor
                    trigger_error(sprintf(NETCAT_FUNCTION_LISTCLASSVARS_ERROR_SUPERVISOR, $cc), E_USER_WARNING);
                }
            }

            return null;
        }

        $nc_tpl_in_cc = 0;
        if ($cc_env['Class_Template_ID'] && !$nc_ctpl) {
            $nc_tpl_in_cc = $cc_env['Class_Template_ID'];
        }

        $class_env = $nc_core->component->get_for_cc($cc_env['Sub_Class_ID'], $cc_env['Class_ID'], $nc_ctpl, $nc_tpl_in_cc, $type);

        foreach ((array)$class_env AS $key => $val) {
            if (!array_key_exists($key, $cc_env) || $cc_env[$key] == "") {
                $cc_env[$key] = $val;
            }
        }

        if ($cc_env["NL2BR"] == -1) {
            $cc_env["NL2BR"] = $class_env["NL2BR"];
        }

        if ($cc_env["AllowTags"] == -1) {
            $cc_env["AllowTags"] = $class_env["AllowTags"];
        }

        if ($cc_env["UseCaptcha"] == -1) {
            $cc_env["UseCaptcha"] = $class_env["UseCaptcha"];
        }

        if ($cc_env["Mixin_Preset_ID"] == -1) {
            $cc_env["Mixin_Preset_ID"] = $class_env["Mixin_Preset_ID"];
        }

        if ($cc_env['MinRecordsInInfoblock'] === null) {
            $cc_env['MinRecordsInInfoblock'] = $class_env['MinRecordsInInfoblock'];
        }

        if ($cc_env['MaxRecordsInInfoblock'] === null) {
            $cc_env['MaxRecordsInInfoblock'] = $class_env['MaxRecordsInInfoblock'];
        }

        if ($nc_core->modules->get_by_keyword("cache")) {
            if ($cc_env["CacheForUser"] == -1) {
                $cc_env["CacheForUser"] = $class_env["CacheForUser"];
            }
        }

        if ($class_env['CustomSettingsTemplate']) {
            $a2f = new nc_a2f($class_env['CustomSettingsTemplate'], 'CustomSettings', false, $cc_env['Sub_Class_ID'], 'class_settings');
            $a2f->set_value($cc_env['CustomSettings']);
            $cc_env["Sub_Class_Settings"] = $a2f->get_values_as_array();
        }

        $cc_env['sysTbl'] = intval($class_env['System_Table_ID']);

        // у блоков областей (area) нет Subdivision_ID
        if ($cc_env['Subdivision_ID']) {
            $sub_env = $nc_core->subdivision->get_by_id($cc_env["Subdivision_ID"]);

            $inherited_params = array(
                'Read_Access_ID', 'Write_Access_ID', 'Edit_Access_ID', 'Checked_Access_ID',
                'Delete_Access_ID', 'Subscribe_Access_ID', 'Moderation_ID',
                'Cache_Access_ID', 'Cache_Lifetime'
            );

            foreach ($inherited_params as $v) {
                if (!$cc_env[$v]) {
                    $cc_env[$v] = $sub_env[$v];
                }
            }

            $cc_env['Subdivision_Name'] = $sub_env['Subdivision_Name'];
            $cc_env['Hidden_URL'] = $sub_env['Hidden_URL'];
        }

        try {
            $cc_env['Hidden_Host'] = $nc_core->catalogue->get_by_id($cc_env['Catalogue_ID'], 'Domain') ?: $_SERVER['HTTP_HOST'];
        } catch (Exception $e) {
            $cc_env['Hidden_Host'] = $_SERVER['HTTP_HOST'];
        }

        return $cc_env;
    }

    /**
     * @param $str
     * @return int
     */
    public function validate_english_name($str) {
        // Check string length: database scheme stores up to 64 characters.
        if (mb_strlen($str) > self::MAX_KEYWORD_LENGTH) {
            return 0;
        }
        // validate Hidden_URL
        return nc_preg_match('/^[\w' . NETCAT_RUALPHABET . '-]+$/', $str);
    }


    /**
     * Проверяет, является ли EnglishName уникальным для инфоблока в указанном разделе
     *
     * @param $subdivision_id
     * @param $infoblock_id
     * @param $english_name
     * @return bool
     */
    public function is_english_name_unique_in_subdivision($subdivision_id, $infoblock_id, $english_name) {
        $db = nc_db();
        return !$db->get_var(
            "SELECT 1
               FROM `Sub_Class`
              WHERE `EnglishName` = '" . $db->escape($english_name) . "'
                AND `Subdivision_ID` = " . (int)$subdivision_id . "
                AND `Sub_Class_ID` != " . (int)$infoblock_id
        );
    }

    /**
     * @param $id
     * @param string $item
     * @return array|string
     */
    public function get_mirror($id, $item = '') {
        $res = array();
        foreach ($this->data as $v) {
            if ($v['SrcMirror'] == $id) {
                if ($item) {
                    return array_key_exists($item, $v) ? $v[$item] : "";
                }
                $res = $v;
            }
        }

        return $res;
    }


    /**
     * Создаёт инфоблок.
     *
     * @param int|string  Идентификатор или ключевое слово компонента
     * @param array $properties  Свойства инфоблока
     *      Subdivision_ID — должно быть указано
     *      EnglishName —
     *          Если не указано, транслитерируется из Sub_Class_Name.
     *          Если уже существует, добавляется суффикс "-1", "-2" и т.п.
     *      Priority — если не указано, то следующий по порядку приоритет в родительском разделе
     * @param array $custom_settings  Пользовательские настройки компонента для инфоблока
     * @return int  ID
     * @throws Exception когда не найден родительский раздел или компонент, при ошибке создания инфоблока
     */
    public function create($component, array $properties, array $custom_settings = null) {
        $nc_core = nc_core::get_object();

        $subdivision_id = $properties['Subdivision_ID'] = (int)nc_array_value($properties, 'Subdivision_ID');
        $parent_infoblock_id = (int)nc_array_value($properties, 'Parent_Sub_Class_ID');

        $site_id = 0;
        if ($subdivision_id) {
            $site_id = $nc_core->subdivision->get_by_id($subdivision_id, 'Catalogue_ID');
        } else if ($parent_infoblock_id) {
            $site_id = $nc_core->sub_class->get_by_id($parent_infoblock_id, 'Catalogue_ID');
        }

        if ($component) {
            // преобразование ключевого слова в ID; гарантирует существование компонента
            $component_id = $nc_core->component->get_by_id($component, 'Class_ID');
            $default_name = $nc_core->component->get_by_id($component_id, 'Class_Name');
            $default_keyword =
                nc_array_value($properties, 'Sub_Class_Name')
                ?: $nc_core->component->get_by_id($component_id, 'Keyword')
                ?: 'object';
            $default_keyword = strtolower(nc_transliterate($default_keyword, true));
        } else {
            // нет $component_id — значит создаём контейнер
            $component_id = 0;
            $default_name = '';
            // значение связки (Subdivision_ID, EnglishName) должно быть уникальным:
            $default_keyword = '_' . str_replace('.', '_', uniqid('', true));
        }

        if (empty($properties['EnglishName'])) {
            unset($properties['EnglishName']);
        }

        // Значения по умолчанию
        $now = new nc_db_expression("NOW()");

        $defaults = array(
            'Class_ID' => $component_id,
            'Catalogue_ID' => $site_id,
            'Sub_Class_Name' => $default_name,
            'EnglishName' => $default_keyword,
            'Class_Template_ID' => 0,
            'LastUpdated' => $now,
            'Created' => $now,
            'Checked' => 1,
        );

        if ($parent_infoblock_id) {
            $parent_infoblock_data = $this->get_by_id($parent_infoblock_id);
            $defaults['Subdivision_ID'] = $parent_infoblock_data['Subdivision_ID'];
            $defaults['AreaKeyword'] = $parent_infoblock_data['AreaKeyword'];
        }

        foreach ($defaults as $field => $default_value) {
            if (!isset($properties[$field])) {
                $properties[$field] = $default_value;
            }
        }

        // Если есть AreaKeyword, то Subdivision_ID должен быть 0
        if (!empty($properties['AreaKeyword'])) {
            $subdivision_id = $properties['Subdivision_ID'] = 0;
        }

        // Установка EnglishName
        $properties['EnglishName'] = $this->get_available_english_name($subdivision_id, $properties['EnglishName']);

        if (!$this->validate_english_name($properties['EnglishName'])) {
            throw new Exception(CONTROL_CONTENT_SUBDIVISION_SUBCLASS_ERROR_KEYWORD_INVALID);
        }

        // Установка приоритета
        if (isset($properties['Priority'])) {
            // задан приоритет, сдвигаем имеющиеся инфоблоки «вниз»
            $properties['Priority'] = (int)$properties['Priority'];
            $nc_core->db->query(
                "UPDATE `Sub_Class`
                    SET `Priority` = `Priority` + 1
                  WHERE `Subdivision_ID` = $subdivision_id
                    AND `Priority` >= " . $properties['Priority']
            );
        } else {
            $area_keyword = nc_array_value($properties, 'AreaKeyword');
            $properties['Priority'] = 1 + $nc_core->db->get_var(
                "SELECT MAX(`Priority`) 
                   FROM `Sub_Class` 
                  WHERE `Catalogue_ID` = " . (int)$properties['Catalogue_ID'] . "
                    AND `Subdivision_ID` = $subdivision_id
                    AND `Parent_Sub_Class_ID` = $parent_infoblock_id
                    AND `AreaKeyword` = '" . $nc_core->db->escape($area_keyword) . "'"
            );
        }

        // Пользовательские настройки макета дизайна в разделе
        $component_custom_settings = $nc_core->component->get_by_id($properties['Class_Template_ID'] ?: $component_id, 'CustomSettingsTemplate');
        if ($component_custom_settings) {
            $a2f = new nc_a2f($component_custom_settings, 'CustomSettings');
            $a2f->set_initial_values();

            if (isset($properties['CustomSettings'])) {
                $a2f->set_values($properties['CustomSettings']);
            }

            if ($custom_settings) {
                $a2f->set_values($custom_settings);
            }

            if (!$a2f->validate($a2f->get_values_as_array())) {
                throw new Exception($a2f->get_validation_errors());
            }

            $a2f->save($custom_settings);

            $properties['CustomSettings'] = $a2f->get_values_as_string();
        }

        $nc_core->event->execute(nc_event::BEFORE_INFOBLOCK_CREATED, $site_id, $subdivision_id, null);
        $infoblock_id = nc_db_table::make('Sub_Class')->insert($properties);

        if (!$infoblock_id) {
            throw new Exception("Unable to create infoblock\n" . $nc_core->db->last_error);
        }

        if ($properties['Condition']) {
            $infoblock_condition_translator = new nc_condition_infoblock_translator($properties['Condition'], $infoblock_id);
            $infoblock_condition_query = $nc_core->db->escape($infoblock_condition_translator->get_sql_condition());
            $nc_core->db->query("UPDATE `Sub_Class` SET `ConditionQuery` = '$infoblock_condition_query' WHERE `Sub_Class_ID` = '$infoblock_id'");
        }

        $nc_core->event->execute(nc_event::AFTER_INFOBLOCK_CREATED, $site_id, $subdivision_id, $infoblock_id);

        return $infoblock_id;
    }

    /**
     * Возвращает доступное ключевое слово инфоблока в указанном разделе, добавляя
     * при необходимости суффикс "-1", "-2" и т. п.
     * @param $subdivision_id
     * @param $desired_english_name
     * @return string
     */
    public function get_available_english_name($subdivision_id, $desired_english_name) {
        $english_name = substr($desired_english_name, 0, self::MAX_KEYWORD_LENGTH);
        $suffix = 1;

        $nc_core = nc_core::get_object();
        while ($nc_core->db->get_var(
            "SELECT 1
               FROM `Sub_Class`
              WHERE `Subdivision_ID` = " . (int)$subdivision_id . "
                AND `EnglishName` = '" . $nc_core->db->escape($english_name) . "'"
        )) {
            $english_name = substr($desired_english_name, 0, self::MAX_KEYWORD_LENGTH - 1 - strlen($suffix)) . '-' . ($suffix++);
        }

        return $english_name;
    }

    /**
     * Копирование инфоблока
     * @param int $source_infoblock_id
     * @param array $destination массив с элементами Catalogue_ID, Subdivision_ID, Parent_Sub_Class_ID, AreaKeyword
     * @param bool $copy_objects
     * @return int ID созданного инфоблока
     * @throws Exception
     */
    public function duplicate($source_infoblock_id, array $destination, $copy_objects = true) {
        $nc_core = nc_core::get_object();
        $db = $nc_core->db;

        $source_infoblock_id = (int)$source_infoblock_id;
        $source_infoblock_properties = $db->get_row(
            "SELECT * FROM `Sub_Class` WHERE `Sub_Class_ID` = $source_infoblock_id",
            ARRAY_A
        );

        if (!$source_infoblock_properties) {
            throw new Exception("Infoblock $source_infoblock_id does not exist");
        }

        $component_id = $source_infoblock_properties['Class_ID'];

        $new_infoblock_data = $source_infoblock_properties;
        unset($new_infoblock_data['Sub_Class_ID'], $new_infoblock_data['Priority']);

        foreach ($destination as $key => $value) {
            $new_infoblock_data[$key] = $value;
        }

        $new_infoblock_id = $this->create($component_id, $new_infoblock_data);

        if ($component_id) {
            if ($copy_objects) {
                $object_ids = $db->get_col("SELECT `Message_ID` FROM `Message{$component_id}` WHERE `Sub_Class_ID` = $source_infoblock_id");
                foreach ($object_ids as $object_id) {
                    $nc_core->message->duplicate($component_id, $object_id, $new_infoblock_id);
                }
            }
        } else {
            // копирование содержимого контейнера:
            $children_ids = $db->get_col("SELECT `Sub_Class_ID` FROM `Sub_Class` WHERE `Parent_Sub_Class_ID` = $source_infoblock_id ORDER BY `Priority`");
            $child_destination = $destination;
            $child_destination['Parent_Sub_Class_ID'] = $new_infoblock_id;
            foreach ($children_ids as $child_id) {
                $this->duplicate($child_id, $child_destination, $copy_objects);
            }
        }

        if (nc_module_check_by_keyword('requests')) {
            nc_requests_form_settings_infoblock::duplicate_settings_for_all_form_types($source_infoblock_id, $new_infoblock_id);
        }

        return $new_infoblock_id;
    }

    /**
     * Изменение положения инфоблока
     * @param int $infoblock_id
     * @param array $destination массив с элементами Catalogue_ID, Subdivision_ID, Parent_Sub_Class_ID, AreaKeyword
     *     Внимание: переданные значения сейчас никак не проверяются, неправильные значения могут привести к нарушению структуры БД.
     * @param bool $update_sibling_priorities сдвигать ли приоритеты последующих блоков
     * @throws Exception
     */
    public function move($infoblock_id, array $destination, $update_sibling_priorities = true) {
        $nc_core = nc_core::get_object();
        $db = $nc_core->db;

        $moved = function() use ($infoblock_id) { return nc_db_table::make('Sub_Class')->where_id($infoblock_id); };
        $old_values = $moved()->get_row();

        if (!$old_values) {
            throw new Exception("Infoblock $infoblock_id does not exist");
        }

        // Если есть Subdivision_ID или Parent_Sub_Class_ID, сайт определяется по ним;
        // иначе должен быть передан элемент Catalogue_ID (сквозной инфоблок первого уровня)
        if (!empty($destination['Subdivision_ID'])) {
            $site_id = $nc_core->subdivision->get_by_id($destination['Subdivision_ID'], 'Catalogue_ID');
        } else if (!empty($destination['Parent_Sub_Class_ID'])) {
            $site_id = $nc_core->sub_class->get_by_id($destination['Parent_Sub_Class_ID'], 'Catalogue_ID');
        } else if (empty($new_values['Catalogue_ID'])) {
            $site_id = $old_values['Catalogue_ID'];
        } else  {
            $site_id = (int)nc_array_value($destination, 'Catalogue_ID') ?: $nc_core->catalogue->get_current('Catalogue_ID');
        }

        if (!empty($destination['AreaKeyword'])) {
            $destination['Subdivision_ID'] = 0;
        }

        $new_values = array(
            'Catalogue_ID' => $site_id,
            'Subdivision_ID' => (int)nc_array_value($destination, 'Subdivision_ID', 0),
            'Parent_Sub_Class_ID' => (int)nc_array_value($destination, 'Parent_Sub_Class_ID', 0),
            'AreaKeyword' => nc_array_value($destination, 'AreaKeyword', ''),
        );

        // Новый приоритет
        $new_values['Priority'] = 1 + nc_db_table::make('Sub_Class')
                ->where($destination)
                ->select(new nc_db_expression("MAX(`Priority`)"))
                ->get_value();

        // Сдвиг приоритетов сиблингов в старом месте
        if ($update_sibling_priorities) {
            $db->query(
                "UPDATE `Sub_Class`
                    SET `Priority` = `Priority` - 1
                  WHERE `Catalogue_ID` = $old_values[Catalogue_ID]
                    AND `Subdivision_ID` = $old_values[Subdivision_ID]
                    AND `Parent_Sub_Class_ID` = $old_values[Parent_Sub_Class_ID]
                    AND `AreaKeyword` = '" . $db->escape($old_values['AreaKeyword']) . "'
                    AND `Priority` > $old_values[Priority]"
            );
        }

        // Проверка возможности использования ключевого слова в новом месте
        if ($new_values['Subdivision_ID'] != $old_values['Subdivision_ID']) {
            $new_values['EnglishName'] = $this->get_available_english_name($new_values['Subdivision_ID'], $old_values['EnglishName']);
        }

        // Событие «до»
        $nc_core->event->execute(nc_event::BEFORE_INFOBLOCK_UPDATED, $old_values['Catalogue_ID'], $old_values['Subdivision_ID'], $infoblock_id);

        // Собственно обновление данных
        $moved()->update($new_values);

        // Событие «после»
        $nc_core->event->execute(nc_event::AFTER_INFOBLOCK_UPDATED, $new_values['Catalogue_ID'], $new_values['Subdivision_ID'], $infoblock_id);

        // Перемещение блоков внутри контейнера
        if (!$old_values['Class_ID']) {
            $children_ids = $db->get_col("SELECT `Sub_Class_ID` FROM `Sub_Class` WHERE `Parent_Sub_Class_ID` = $infoblock_id");
            $child_destination = $destination;
            $child_destination['Parent_Sub_Class_ID'] = $infoblock_id;
            foreach ($children_ids as $child_id) {
                $this->move($child_id, $child_destination, false);
            }
        } else if ($new_values['Subdivision_ID'] != $old_values['Subdivision_ID']) {
            // изменение Subdivision_ID у объектов
            // (событие не вызывается, время изменения не меняется)
            $db->query(
                "UPDATE `Message$old_values[Class_ID]`
                    SET `Subdivision_ID` = $new_values[Subdivision_ID],
                        `LastUpdated` = `LastUpdated`
                  WHERE `Sub_Class_ID` = $infoblock_id"
            );
        }
        $this->clear_cache();
    }

    /**
     * Удаление инфоблока
     * @param int $infoblock_id
     * @return bool
     * @throws Exception
     */
    public function delete($infoblock_id) {
        $infoblock_id = (int)$infoblock_id;
        $nc_core = nc_core::get_object();
        $previous_db_error = $nc_core->db->last_error;
        $sub_class_info = $nc_core->sub_class->get_by_id($infoblock_id);

        $nc_core->event->execute(nc_Event::BEFORE_INFOBLOCK_DELETED, $sub_class_info['Catalogue_ID'], $sub_class_info['Subdivision_ID'], $infoblock_id);

        // Для контейнера удалим все его содержимое
        if (!$sub_class_info['Class_ID']) {
            $child_infoblock_ids = $nc_core->db->get_col("SELECT `Sub_Class_ID` FROM `Sub_Class` WHERE `Parent_Sub_Class_ID` = $infoblock_id");
            foreach ($child_infoblock_ids as $child_infoblock_id) {
                $this->delete($child_infoblock_id);
            }
        }

        if ($sub_class_info['Class_ID']) {
            $messages = $nc_core->db->get_col(
                "SELECT `Message_ID`
                 FROM `Message{$sub_class_info['Class_ID']}`
                 WHERE `Sub_Class_ID` = $infoblock_id"
            );

            if (nc_module_check_by_keyword('comments')) {
                nc_comments::dropRuleSubClass($nc_core->db, $infoblock_id);
                nc_comments::dropComments($nc_core->db, $infoblock_id, 'Sub_Class');
            }

            if (!$nc_core->db->get_var("SELECT `System_Table_ID` FROM `Class` WHERE `Class_ID` = $sub_class_info[Class_ID]")) {
                $file_fields = $nc_core->db->get_results(
                    "SELECT `Field_ID`, `Field_Name`
                     FROM `Field`
                     WHERE `Class_ID` = '$sub_class_info[Class_ID]'
                     AND `System_Table_ID` = 0
                     AND `TypeOfData_ID` = " . NC_FIELDTYPE_FILE,
                    ARRAY_A
                );

                if ($file_fields && $messages) {
                    foreach ($file_fields as $field) {
                        foreach ($messages as $message_id) {
                            DeleteFile($field['Field_ID'], $field['Field_Name'], $sub_class_info['Class_ID'], '', $message_id);
                        }
                    }
                }

                // delete dir
                DeleteSubClassDir($infoblock_id);

                $nc_core->message->delete_by_id($messages, $sub_class_info['Class_ID'], $nc_core->get_settings('TrashUse'));
            }
        }

        $nc_core->db->query("DELETE FROM `Sub_Class_AreaCondition_Subdivision` WHERE `Sub_Class_ID` = $infoblock_id");
        $nc_core->db->query("DELETE FROM `Sub_Class_AreaCondition_Subdivision_Exception` WHERE `Sub_Class_ID` = $infoblock_id");
        $nc_core->db->query("DELETE FROM `Sub_Class_AreaCondition_Class` WHERE `Sub_Class_ID` = $infoblock_id");
        $nc_core->db->query("DELETE FROM `Sub_Class_AreaCondition_Class_Exception` WHERE `Sub_Class_ID` = $infoblock_id");
        $nc_core->db->query("DELETE FROM `Sub_Class_AreaCondition_Message` WHERE `Sub_Class_ID` = $infoblock_id");
        $nc_core->db->query("DELETE FROM `Sub_Class` WHERE `Sub_Class_ID` = $infoblock_id");

        if ($nc_core->db->last_error && $nc_core->db->last_error !== $previous_db_error) {
            return false;
        }

        $nc_core->event->execute(nc_Event::AFTER_INFOBLOCK_DELETED, $sub_class_info['Catalogue_ID'], $sub_class_info['Subdivision_ID'], $infoblock_id);

        return true;
    }

    /**
     * @param $infoblock_id
     */
    public function create_mock_objects($infoblock_id) {
        $nc_core = nc_core::get_object();
        $component_id = $this->get_by_id($infoblock_id, 'Class_ID');
        $min_records = (int)$this->get_by_id($infoblock_id, 'MinRecordsInInfoblock');
        $num_records = nc_db()->get_var(
            "SELECT COUNT(*) FROM `Message{$component_id}` WHERE `Sub_Class_ID` = " . (int)$infoblock_id
        );
        for ($i = $num_records; $i < $min_records; $i++) {
            $nc_core->message->create_mock($infoblock_id);
        }
    }

    /**
     * Возвращает свойства первого инфоблока в разделе из указанного компонента
     *
     * @param $subdivision_id
     * @param $component_id_or_keyword
     * @param null|string $property
     * @return mixed
     * @throws nc_Exception_Class_Doesnt_Exist
     */
    public function get_first_subdivision_infoblock_by_component_id($subdivision_id, $component_id_or_keyword, $property = null) {
        $nc_core = nc_core::get_object();

        $component_id = $nc_core->component->get_by_id($component_id_or_keyword, 'Class_ID');

        $infoblocks_in_subdivision = $this->get_by_subdivision_id($subdivision_id);
        foreach ($infoblocks_in_subdivision as $infoblock) {
            if ($infoblock['Class_ID'] == $component_id) {
                return $property ? $infoblock[$property] : $infoblock;
            }
        }

        return null;
    }

    /**
     *
     */
    public function clear_cache() {
        unset($this->data, $this->ctpl_cache, $this->subdivision_cache, $this->subdivision_first_checked_cache);
        $this->container_cache = array();
    }
}
