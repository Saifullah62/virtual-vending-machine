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
