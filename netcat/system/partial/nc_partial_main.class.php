<?php

/**
 * Контейнер основной контентной области.
 * Выводит основной контент страницы (инфоблоки раздела, содержимое инфоблока, страницу
 * объекта или действия с объектами и т. д.)
 */
class nc_partial_main extends nc_partial {

    /** @var string префикс комментария (должен быть определён в классе-наследнике */
    protected $partial_comment_id_prefix = 'm';
    /** @var int счётчик вложенных фрагментов с отложенной загрузкой (используется в ID комментария) */
    static protected $partial_last_sequence_number = 0;
    /** @var int счётчик вложенных вызовов (фрагмент внутри фрагмента) */
    static protected $partial_nesting_level = 0;

    /** @var int */
    protected $container_id;

    /**
     * nc_partial_main constructor.
     *
     * @param int $container_id
     * @param array $data
     */
    public function __construct($container_id) {
        $this->container_id = (int)$container_id;
    }

    /**
     * @return string
     */
    public function get_content() {
        $nc_core = nc_core::get_object();
        $is_edit_mode = $nc_core->admin_mode && !$nc_core->inside_admin;

        $container_id = $this->container_id;
        $container_properties = $nc_core->sub_class->get_by_id($container_id);
        $container_has_mixin_settings = $container_properties['Mixin_Preset_ID'] || $container_properties['Mixin_Settings'];
        $sub = $nc_core->subdivision->get_current('Subdivision_ID');

        $mixins_css_class = 'tpl-container-' . $container_id;
        $mixins_list_css_class = $mixins_css_class . '-list';
        if ($container_has_mixin_settings) {
            nc_tpl_mixin_assembler::assemble(".$mixins_css_class", ".$mixins_list_css_class", $container_properties);
        }

        $result = '<div class="' . ($is_edit_mode ? 'nc-container nc-container-main ' : '') . $mixins_css_class . '">';

        if ($is_edit_mode) {
            $result .= nc_admin_infoblock_insert_toolbar($sub, $container_properties['AreaKeyword'], $container_properties['Parent_Sub_Class_ID'], 'before', $container_id);
            $result .= '<div class="nc-container-border"></div>';
            $result .= nc_AdminCommonMultiBlock($container_id, $sub, false);
        }

        $result .= '<div class="tpl-block-list">'; // используется в nc_admin.js для поиска тулбаров
        $result .= '<div class="tpl-block-list-objects ' . $mixins_list_css_class . '" data-object-number="' . count($GLOBALS['cc_array']) . '">';
        $result .= '%NC_AREA_MAIN_CONTENT%';
        $result .= '</div>'; // .tpl-block-list-objects
        $result .= '</div>'; // .tpl-block-list

        if ($is_edit_mode) {
            $result .= nc_admin_infoblock_insert_toolbar($sub, $container_properties['AreaKeyword'], $container_properties['Parent_Sub_Class_ID'], 'after', $container_id);
        }

        $result .= '</div>'; // .nc-container

        return $result;
    }

    /**
     * @return int
     */
    protected function get_src() {
        return $this->container_id;
    }

}