IN=build/index.html
OUT=build/enqueue.php

(echo "<?php "; i=0; for x in $(grep -o '"wordpress/[^"]*\.js"' $IN | sed -e 's/wordpress//'); do echo "wp_enqueue_script('fp$i', $x);"; ((i++)); done) > $OUT

