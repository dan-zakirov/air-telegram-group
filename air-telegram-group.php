<?php
/**
 * Plugin Name: Air Gutenberg Block to Show Telegram Group
 * Plugin URI: https://example.com
 * Description: Gutenberg Block to display a Telegram block.
 * Version: 1.0.0
 * Author: Dan Zakirov
 * Author URI: https://air-wp.com/
 * License: GPL2
 * Text Domain: air-telegram-group
 * Domain Path: /languages
 *
 * @package Air_Gutenberg_Block_To_Show_Telegram_Group
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load plugin textdomain.
 */
function air_gut_tg_load_plugin_textdomain() {
    load_plugin_textdomain('air-telegram-group', false, dirname(plugin_basename(__FILE__)) . '/languages/');
}
add_action( 'plugins_loaded', 'air_gut_tg_load_plugin_textdomain' );


// Register block scripts and styles
function air_gut_tg_enqueue_block_assets() {

    wp_enqueue_script(
        'air-gut-tg-block-sc',
        plugin_dir_url( __FILE__ ) . 'assets/js/block.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-i18n', 'wp-components' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/block.js' )
    );

    wp_set_script_translations( 'air-gut-tg-block-sc', 'air-telegram-group', plugin_dir_path( __FILE__ ) . 'languages' );

    wp_enqueue_style(
        'air-gut-tg-additional-style',
        plugin_dir_url( __FILE__ ) . 'assets/css/admin-style.css',
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/admin-style.css' )
    );
}
add_action( 'enqueue_block_editor_assets', 'air_gut_tg_enqueue_block_assets' );

function air_gut_tg_enqueue_block_assets_frontend() {
    wp_enqueue_style(
        'air-gut-tg-block-style-frontend',
        plugin_dir_url( __FILE__ ) . 'assets/css/block.css',
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/block.css' )
    );

    wp_enqueue_script(
        'air-gut-tg-frontend-js',
        plugin_dir_url( __FILE__ ) . 'assets/js/frontend.js',
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/frontend.js' ),
        true
    );
}
add_action( 'enqueue_block_assets', 'air_gut_tg_enqueue_block_assets_frontend' );

/**
 * Register custom block category if it doesn't exist.
 *
 * @param array  $categories Default block categories.
 * @param object $post       The post being edited.
 *
 * @return array Modified block categories.
 */
function air_gut_tg_register_block_category( $categories, $post ) {
    $target_category = array(
        'slug'  => 'air-gut-tg',
        'title' => __( 'Air Gutenberg Block', 'air-telegram-group' ),
    );

    // Check if the target category already exists.
    foreach ( $categories as $category ) {
        if ( $category['slug'] === $target_category['slug'] ) {
            return $categories;
        }
    }

    // Add the target category to the beginning of the categories array.
    array_unshift( $categories, $target_category );

    return $categories;
}
add_filter( 'block_categories_all', 'air_gut_tg_register_block_category', 10, 2 );
