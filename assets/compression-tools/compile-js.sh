#!/bin/bash

echo "cd into the projects compression-tools directory before running"

dirname=../js
compiler=compiler.jar
tmpfile=./tmp.js
optlevel=SIMPLE_OPTIMIZATIONS
#optlevel=ADVANCED_OPTIMIZATIONS

if [ -e $tmpfile ]; then rm $tmpfile; fi

# getting plugins
files=`find $dirname/plugins -name "*.js"`
for i in $files;
do
    echo "adding file $i"
    cat $i >> $tmpfile;
done

# getting _main.js
echo "adding file $dirname/_main.js"
cat $dirname/_main.js >> $tmpfile

java -jar $compiler $tmpfile --compilation_level $optlevel --js_output_file $dirname/scripts.min.js --warning_level QUIET --summary_detail_level 3 && rm $tmpfile || echo 'failed to compress js files'
