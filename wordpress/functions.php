<?php
/**
 * Enqueue React app scripts and styles
 */
function enqueue_react_app() {
    $asset_manifest = json_decode(file_get_contents(get_template_directory() . '/dist/manifest.json'), true);
    
    if (isset($asset_manifest['index.html'])) {
        $react_js = $asset_manifest['index.html']['file'];
        $react_css = $asset_manifest['index.html']['css'][0];
        
        wp_enqueue_style(
            'react-app',
            get_template_directory_uri() . '/dist/' . $react_css,
            array(),
            null
        );
        
        wp_enqueue_script(
            'react-app',
            get_template_directory_uri() . '/dist/' . $react_js,
            array(),
            null,
            true
        );

        // Pass WordPress data to React
        wp_localize_script('react-app', 'wpData', array(
            'apiUrl' => rest_url(),
            'nonce' => wp_create_nonce('wp_rest'),
            'userId' => get_current_user_id(),
        ));
    }
}
add_action('wp_enqueue_scripts', 'enqueue_react_app');

/**
 * Register shortcode for React app
 */
function react_app_shortcode() {
    return '<div id="root"></div>';
}
add_shortcode('react_vending_machine', 'react_app_shortcode');

/**
 * Add security headers
 */
function add_security_headers() {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('X-XSS-Protection: 1; mode=block');
    header('Referrer-Policy: strict-origin-when-cross-origin');
}
add_action('send_headers', 'add_security_headers');

/**
 * Register REST API endpoints
 */
function register_api_endpoints() {
    register_rest_route('vending-machine/v1', '/cards', array(
        'methods' => 'GET',
        'callback' => 'get_cards',
        'permission_callback' => function() {
            return current_user_can('read');
        }
    ));
}
add_action('rest_api_init', 'register_api_endpoints');