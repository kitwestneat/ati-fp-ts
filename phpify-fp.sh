#!/bin/bash
IN=build/index.html
OUT=build/enqueue.php

get_scripts() {
    i=0
    for x in $(grep -o '"wordpress/[^"]*\.js"' $IN | sed -e 's/wordpress//'); do
        echo "wp_enqueue_script('script-fp$i', $x); "
        ((i++)) || true
    done
}

get_styles() {
    i=0
    for x in $(grep -o '"wordpress/[^"]*\.css"' $IN | sed -e 's/wordpress//'); do
        echo "wp_enqueue_style('style-fp$i', $x); "
        ((i++)) || true
    done
}

run() {
    echo "<?php "
    get_scripts
    get_styles
}
run > $OUT
