<?php

if (!class_exists('nc_core')) {
    die;
}

/** @var array $infoblock_data */
/** @var array $mixin_presets */
/** @var array $visibility_conditions */
/** @var nc_core $nc_core */

?>
<div class="nc-modal-dialog nc-infoblock-settings-dialog">
    <div class="nc-modal-dialog-header">
        <h2><?= $infoblock_data['Class_ID'] ? $infoblock_data['Sub_Class_Name'] : NETCAT_INFOBLOCK_SETTINGS_TITLE_CONTAINER ?></h2>
    </div>
    <div class="nc-modal-dialog-body">
        <form action="<?= $nc_core->SUB_FOLDER . $nc_core->HTTP_ROOT_PATH ?>action.php" method="post" class="nc-form">

            <input type="hidden" name="ctrl" value="admin.infoblock">
            <input type="hidden" name="action" value="save">
            <input type="hidden" name="infoblock_id" value="<?= $infoblock_data['Sub_Class_ID'] ?>">

            <?php if ($custom_settings): ?>
            <div data-tab-id="settings" data-tab-caption="<?= NETCAT_INFOBLOCK_SETTINGS_TAB_CUSTOM ?>" class="custom_settings">
                <?= $custom_settings ?>
            </div>
            <?php endif; ?>

            <div data-tab-id="mixins" data-tab-caption="<?= NETCAT_MIXIN_TITLE ?>">
                <?= $this->include_view('../mixin/mixin_editor', array(
                        'editor_mode' => 'infoblock',
                        'data' => $infoblock_data,
                        'mixin_presets' => $mixin_presets,
                )) ?>
            </div>

            <?php if (!$infoblock_data['Subdivision_ID']): ?>
            <div data-tab-id="visibility" data-tab-caption="<?= NETCAT_INFOBLOCK_SETTINGS_TAB_VISIBILITY ?>">
                <?= $this->include_view('settings_dialog/visibility_conditions', array(
                        'infoblock_data' => $infoblock_data,
                        'visibility_conditions' => $visibility_conditions,
                )) ?>
            </div>
            <?php endif; ?>

            <div data-tab-id="others" data-tab-caption="<?= NETCAT_INFOBLOCK_SETTINGS_TAB_OTHERS ?>">
                <?= $this->include_view('settings_dialog/others', array(
                    'infoblock_data' => $infoblock_data,
                )) ?>
            </div>

            <div data-tab-id="conditions" data-tab-caption="<?= NETCAT_CONDITION_FIELD ?>">
                <?= $this->include_view('settings_dialog/conditions', array(
                    'infoblock_data' => $infoblock_data,
                )) ?>
            </div>

<!--            <div data-tab-id="loading" data-tab-caption="--><?//= NETCAT_INFOBLOCK_SETTINGS_TAB_LOADING ?><!--">-->
<!--            </div>-->

        </form>
    </div>
    <div class="nc-modal-dialog-footer">
        <button data-action="submit"><?= NETCAT_REMIND_SAVE_SAVE ?></button>
        <button data-action="close"><?= CONTROL_BUTTON_CANCEL ?></button>
    </div>
</div>
