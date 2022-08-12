<?php

if (!class_exists('nc_core')) {
    die;
}

/**
 * @var nc_core $nc_core
 *
 * @var string $editor_mode 'infoblock', 'mixin_preset', 'subdivision'
 * @var string $settings_field_name название поля, в котором сохраняются настройки MixinSettings
 *      (если не задано, то 'data[Mixin_Settings]')
 * @var array $data параметры:
 *      — Mixin_Settings
 *      Для $editor_mode == 'infoblock':
 *      — Class_Template_ID || Class_ID
 *      — Mixin_Preset_ID
 * @var array|null $mixin_presets
 */
$mixin_types = nc_tpl_mixin_type::get_all();

$preset_controller_url = $nc_core->SUB_FOLDER . $nc_core->HTTP_ROOT_PATH . 'action.php?ctrl=admin.mixin_preset&action=';

// Структура массива с настройками (пресет):
// селектор → тип (группа) миксинов → ширина «до» : { mixin => ключевое слово миксина, settings => настройки }
// $mixin_settings = array(
//    '' => array(
//        'visibility' => array(
//            600 => array(
//                'mixin' => 'netcat_visibility_hide',
//            ),
//            1200 => array(
//                'mixin' => 'netcat_visibility_hide',
//            ),
//        ),
//        'layout' => array(
//            // ----0----
//            300 => array(
//                'mixin' => '',
//            ),
//            9999 => array(
//                'mixin' => 'netcat_layout_tiles',
//                'settings' => array(
//                    'min_tile_width' => '500',
//                    'objects' => array(
//                        '1' => array('width' => 'MIXIN_SETTINGS_WIDTH')
//                    ),
//                ),
//            ),
//        )
//    ),
//    // АЛЬТ КЛАСС
//    '.tile-wide' => array(),
//);

$lang = array(
    'PRESET_DEFAULT' => NETCAT_MIXIN_PRESET_DEFAULT,
    'PRESET_DEFAULT_NONE' => NETCAT_MIXIN_PRESET_DEFAULT_NONE,
    'BREAKPOINT_ADD' => NETCAT_MIXIN_BREAKPOINT_ADD,
    'BREAKPOINT_ADD_PROMPT' => NETCAT_MIXIN_BREAKPOINT_ADD_PROMPT,
    'BREAKPOINT_ADD_PROMPT_RANGE' => NETCAT_MIXIN_BREAKPOINT_ADD_PROMPT_RANGE,
    'BREAKPOINT_CHANGE' => NETCAT_MIXIN_BREAKPOINT_CHANGE,
    'BREAKPOINT_CHANGE_PROMPT' => NETCAT_MIXIN_BREAKPOINT_CHANGE_PROMPT,
    'SELECTOR_ADD_PROMPT' => NETCAT_MIXIN_SELECTOR_ADD_PROMPT,
    'FOR_WIDTH_FROM' => NETCAT_MIXIN_FOR_WIDTH_FROM,
    'FOR_WIDTH_TO' => NETCAT_MIXIN_FOR_WIDTH_TO,
    'FOR_WIDTH_RANGE' => NETCAT_MIXIN_FOR_WIDTH_RANGE,
    'FOR_WIDTH_ANY' => NETCAT_MIXIN_FOR_WIDTH_ANY,
    'FOR_VIEWPORT_WIDTH_FROM' => NETCAT_MIXIN_FOR_VIEWPORT_WIDTH_FROM,
    'FOR_VIEWPORT_WIDTH_TO' => NETCAT_MIXIN_FOR_VIEWPORT_WIDTH_TO,
    'FOR_VIEWPORT_WIDTH_RANGE' => NETCAT_MIXIN_FOR_VIEWPORT_WIDTH_RANGE,
    'FOR_VIEWPORT_WIDTH_ANY' => NETCAT_MIXIN_FOR_VIEWPORT_WIDTH_ANY,
    'FOR_BLOCK_WIDTH_FROM' => NETCAT_MIXIN_FOR_BLOCK_WIDTH_FROM,
    'FOR_BLOCK_WIDTH_TO' => NETCAT_MIXIN_FOR_BLOCK_WIDTH_TO,
    'FOR_BLOCK_WIDTH_RANGE' => NETCAT_MIXIN_FOR_BLOCK_WIDTH_RANGE,
    'FOR_BLOCK_WIDTH_ANY' => NETCAT_MIXIN_FOR_BLOCK_WIDTH_ANY,
);

?>

<div class="nc-mixins-editor"
     data-preset-edit-dialog-url="<?= $preset_controller_url ?>show_edit_dialog"
     data-preset-delete-dialog-url="<?= $preset_controller_url ?>show_delete_dialog">
    <input type="hidden" class="nc-mixins-json"
           name="<?= isset($settings_field_name) ? $settings_field_name : 'data[Mixin_Settings]' ?>"
           value="<?= htmlspecialchars($data['Mixin_Settings'] ?: '{}') ?>">

    <?php if ($editor_mode === 'infoblock'): ?>
        <div class="nc-mixins-preset-select-container">
            <label>
                <?= NETCAT_MIXIN_PRESET_SELECT ?>:
                <select name="data[Mixin_Preset_ID]" class="nc-mixins-preset-select"
                data-name-template="<?= htmlspecialchars(NETCAT_MIXIN_DEFAULT . " (&laquo;%s&raquo;)") ?>">
                    <?php foreach ((array)$mixin_presets as $id => $preset): ?>
                    <option value="<?= $id ?>" <?= !empty($preset['selected']) ? 'selected' : '' ?>
                        data-settings="<?= htmlspecialchars($preset['settings']) ?>"
                        data-id="<?= $preset['id'] ?>">
                        <?= $preset['name'] ?>
                    </option>
                    <?php endforeach; ?>
                    <option value="+"><?= NETCAT_MIXIN_PRESET_CREATE ?></option>
                </select>
            </label>
            <span class="nc-mixins-preset-actions" style="display: none">
                <i class="nc-icon nc--edit" title="<?= NETCAT_MIXIN_PRESET_EDIT_BUTTON ?>"></i>
                <i class="nc-icon nc--remove" title="<?= NETCAT_MIXIN_PRESET_REMOVE_BUTTON ?>"></i>
            </span>
        </div>
    <?php endif; ?>

    <table class="nc-mixins-table">
        <thead>
        <tr>
            <td colspan="1" class="nc-mixins-width-head nc-mixins-width-icon" title="<?= NETCAT_MIXIN_WIDTH ?>">
                <i class="nc-icon-block-width"></i>
            </td>
            <td rowspan="2" class="nc-mixins-head">
                <?php if ($editor_mode === 'infoblock'): ?>
                <div style="float: left">
                    <div><?= NETCAT_MIXIN_BREAKPOINT_TYPE ?>:</div>
                    <select name="data[Mixin_BreakpointType]" class="nc-mixins-breakpoint-type-select">
                        <option value="block"><?= NETCAT_MIXIN_BREAKPOINT_TYPE_BLOCK ?></option>
                        <option value="viewport"<?= $data['Mixin_BreakpointType'] === 'viewport' ? ' selected' : '' ?>>
                            <?= NETCAT_MIXIN_BREAKPOINT_TYPE_VIEWPORT ?>
                        </option>
                    </select>
                </div>
                <?php endif; ?>
                <div style="float: right" class="nc-mixins-selector-container">
                    <div><?= NETCAT_MIXIN_SELECTOR ?>:</div>
                    <select class="nc-mixins-selector-select">
                        <option value=""><?= NETCAT_MIXIN_NONE ?></option>
                        <option value="+"><?= NETCAT_MIXIN_SELECTOR_ADD ?></option>
                    </select>
                    <i class="nc-icon nc--remove" title="удалить" style="display: none"></i>
                </div>
            </td>
        </tr>
        <tr class="nc-mixins-width-ranges">
            <td class="nc-mixins-width nc-mixins-width nc-mixins-width--first nc-mixins-width--last nc-mixins-width-head" data-breakpoint="<?= nc_tpl_mixin::MAX_BLOCK_WIDTH ?>">
                <div class="nc-mixins-breakpoint-add-button-container">
                    <div class="nc-mixins-breakpoint-add-button" title="<?= NETCAT_MIXIN_BREAKPOINT_ADD ?>">+</div>
                </div>
                <div class="nc-mixins-breakpoint"><span>&#x2731;<!-- ✱ --></span></div>
            </td>
        </tr>
        </thead>

        <tbody>
        <?php foreach ($mixin_types as $mixin_type): ?>
            <tr class="nc-mixins-mixin-row" data-mixin-type="<?= $mixin_type->get('type') ?>">
                <td class="nc-mixins-width nc-mixins-width--first nc-mixins-width--last" data-breakpoint="<?= nc_tpl_mixin::MAX_BLOCK_WIDTH ?>">
                </td>
                <td class="nc-mixins-settings-cell">
                    <span class="nc-mixins-mixin-type-name"><?= $mixin_type->get('name') ?></span>
                    <span class="nc-mixins-mixin-range-description"></span>
                    <span class="nc-mixins-mixin-remove">
                        <i class="nc-icon nc--remove" title="<?= NETCAT_MIXIN_SETTINGS_REMOVE ?>"></i>
                    </span>
                    <div class="nc-mixins-mixin-select-container">
                        <select name="mixin.mixin" class="nc-mixins-mixin-select">
                            <option value=""><?= NETCAT_MIXIN_NONE ?></option>
                            <?php foreach ($mixin_type->get_mixins()->each('get', 'name') as $mixin_keyword => $mixin_name): ?>
                            <option value="<?= $mixin_keyword ?>"><?= $mixin_name ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="nc-mixins-mixin-settings-container">
                        <?php foreach ($mixin_type->get_mixins()->each('get_block_settings_form') as $mixin_keyword => $block_settings_form): ?>
                            <?php if (trim($block_settings_form)): ?>
                                <div class="nc-mixins-mixin-settings" data-mixin-keyword="<?= $mixin_keyword ?>">
                                    <?= $block_settings_form ?>
                                </div>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </div>
                </td>
            </tr>
        <?php endforeach; ?>
        </tbody>

    </table>
</div>

<script>
(function() {
    var container = nc.ui.modal_dialog.get_current_dialog() || $nc('body');
    new nc_mixin_settings_editor({
        lang: <?= nc_array_json($lang) ?>,
        container: container.find('.nc-mixins-editor'),
        component_template_id: '<?= nc_array_value($data, 'Class_Template_ID') ?: nc_array_value($data, 'Class_ID') ?>',
        infoblock_id: <?= nc_array_value($data, 'Sub_Class_ID', 'null') ?>,
        fonts: <?= nc_array_json(nc_tpl_font::get_available_fonts()) ?>
    });
})();
</script>
