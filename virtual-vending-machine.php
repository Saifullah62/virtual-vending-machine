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
