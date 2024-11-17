touch includes/vvm-functions.php
<?php
// Function to create custom WooCommerce product categories for Sharepacks.
function vvm_create_sharepack_categories() {
    if (class_exists('WooCommerce')) {
        wp_insert_term('Common', 'product_cat', array('description' => 'Common Sharepack', 'slug' => 'common-sharepack'));
        wp_insert_term('Rare', 'product_cat', array('description' => 'Rare Sharepack', 'slug' => 'rare-sharepack'));
        wp_insert_term('Ultra-Rare', 'product_cat', array('description' => 'Ultra-Rare Sharepack', 'slug' => 'ultra-rare-sharepack'));
        wp_insert_term('Grail', 'product_cat', array('description' => 'Grail Sharepack', 'slug' => 'grail-sharepack'));
    }
}
add_action('init', 'vvm_create_sharepack_categories');
