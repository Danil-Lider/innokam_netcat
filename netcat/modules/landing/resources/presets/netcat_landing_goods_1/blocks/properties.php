<?php

class nc_landing_preset_netcat_landing_goods_1_block_properties extends nc_landing_preset_block {

    protected $component = 'netcat_page_block_table';
    protected $default_component_template = 'table';
    protected $default_infoblock_keyword = 'specs';
    protected $default_infoblock_name = 'Характеристики';

    protected $ignore_user_objects = true;
    protected $ignore_user_infoblock_settings = array('text', 'product_image');


    protected function get_objects_properties($infoblock_id, $settings, array $landing_data) {
        $objects = array();
        $item = $landing_data['item'];

        if ($item instanceof nc_netshop_item) {
            $component = nc_core::get_object()->get_component($item['Class_ID']);

            $property_fields = $component->get_fields_by_name_prefix("Property_", null, true);
            foreach ($property_fields as $field) {
                $value = $item[$field['name']];
                if (is_array($value)) {
                    $value = join(', ', $value);
                }
                if ($field['type'] == NC_FIELDTYPE_BOOLEAN) {
                    $value = $value ? 'да' : 'нет';
                }

                $objects[] = array(
                    'Name' => $field['description'],
                    'Value' => $value,
                );
            }
        }
        else {
            $objects = array(
                array('Name' => 'Высота', 'Value' => '88 см'),
                array('Name' => 'Ширина', 'Value' => '66,5 см'),
                array('Name' => 'Длина', 'Value' => '83 см'),
                array('Name' => 'Дизайн', 'Value' => 'Геррит Ритвельд, 1918 г.'),
                array('Name' => 'Оригинал', 'Value' => 'Нью-Йоркский музей современного искусства'),
            );
        }

        return $objects;
    }
    

    protected function get_default_infoblock_settings($subdivision_id, $settings, array $landing_data) {
        $item = $landing_data['item'];

        if ($item) {
            $text = $item['Name'] . ' — техническая информация';
            $image = $item['BigImage'] ?: $item['Image'];
        }
        else {
            $text = 'Техническая информация о стуле Red and Blue от Cassina';
            $image = $this->get_image_path('stoel5.jpg');
        }

        return array(
            'show_header' => 1,
            'header' => 'Характеристики',
            'show_text' => 1,
            'text' => $text,
            'product_image' => array(
                'file' => $image,
            ),
        );
    }
    
}