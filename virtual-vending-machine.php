<?php
/*
Plugin Name: Virtual Vending Machine
Plugin URI: https://github.com/your-username/virtual-vending-machine
Description: A virtual vending machine for selling randomized share packs.
Version: 1.0
Author: BWDaugherty
Author URI: https://github.com/saifullah62
License: GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

// Make sure the file is not called directly.
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// Plugin activation hook
function vvm_activate() {
    // Activation code here, like setting default options.
}
register_activation_hook(__FILE__, 'vvm_activate');

// Plugin deactivation hook
function vvm_deactivate() {
    // Deactivation code here, such as cleaning temporary data.
}
register_deactivation_hook(__FILE__, 'vvm_deactivate');
add_action('woocommerce_thankyou', 'vvm_assign_random_share_tier', 10, 1);

function vvm_assign_random_share_tier($order_id) {
    if (!$order_id) {
        return;
    }

    // Get order details
    $order = wc_get_order($order_id);

    // Randomize the share tier (Common, Rare, etc.)
    $rand = rand(1, 100);
    $share_tier = '';
    if ($rand <= 60) {
        $share_tier = 'Common';
    } elseif ($rand <= 90) {
        $share_tier = 'Rare';
    } elseif ($rand <= 99) {
        $share_tier = 'Ultra-Rare';
    } else {
        $share_tier = 'Grail';
    }

    // For now, simply add a note to the order with the assigned tier
    $order->add_order_note('Share Tier Assigned: ' . $share_tier);
}

add_filter('woocommerce_account_menu_items', 'vvm_add_my_vault_link', 40);
function vvm_add_my_vault_link($menu_links) {
    $menu_links['my-vault'] = 'My Vault';
    return $menu_links;
}

add_action('woocommerce_account_my-vault_endpoint', 'vvm_my_vault_content');
function vvm_my_vault_content() {
    echo '<h3>My Vault</h3>';
    echo '<p>Here you can view the Sharepacks you own.</p>';
    // For simplicity, fetch orders and display assigned shares
    $user_id = get_current_user_id();
    $orders = wc_get_orders(array(
        'customer_id' => $user_id,
        'limit' => -1,
    ));
    foreach ($orders as $order) {
        echo '<p>Order #'. $order->get_id() .': ';
        echo $order->get_meta('_share_tier') ?: 'No shares assigned yet.';
        echo '</p>';
    }
}

add_shortcode('vvm_button', 'vvm_vending_machine_button');
function vvm_vending_machine_button() {
    return '<button id="vvm-buy-button">Buy a Sharepack!</button>';
}

function vvm_enqueue_scripts() {
    wp_enqueue_script('vvm-script', plugins_url('/js/vvm-script.js', __FILE__), array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'vvm_enqueue_scripts');

// In the /js directory, create vvm-script.js:
jQuery(document).ready(function($) {
    $('#vvm-buy-button').click(function() {
        alert('You have bought a Sharepack! Proceed to checkout.');
    });
});

require_once plugin_dir_path(__FILE__) . 'includes/vvm-functions.php';
// Enqueue frontend scripts
function vvm_enqueue_scripts() {
    wp_enqueue_script('vvm-script', plugin_dir_url(__FILE__) . 'assets/js/vvm-script.js', array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'vvm_enqueue_scripts');
// Shortcode to display vending machine template
function vvm_display_vending_machine() {
    ob_start();
    include plugin_dir_path(__FILE__) . 'templates/vvm-vending-machine-template.php';
    return ob_get_clean();
}
add_shortcode('vvm_vending_machine', 'vvm_display_vending_machine');
