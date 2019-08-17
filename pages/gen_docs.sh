#!/bin/bash
# Script for sourcing markdown files and parsing them into html. Path to files are given.
AUTHOR="Matthew Yu"
DATE=$(date +"%D")

echo "Starting gen_docs.sh."

# get list of markdown files
directory_path="$1"
dir_list=($directory_path/*.md)
echo "Found markdown files: ${dir_list[@]}"

# for each markdown file, initialize variables
for file in ${dir_list[@]}; do
	file_name=$(basename -- "$file")
	extension="${file_name##*.}"
	file_name="${file_name%.*}"
	echo "Generating: $file_name"

	title="$filename"

	output_file=${file_name}.html
	# clear current file name if it exists
	truncate -s 0 $output_file
	# parse markdown into html content (add features to extras as needed)
	content=$(python2 -m markdown2 $file --extras tables)

	if [ "$2" == "html-frag" ]; then
		# html component fragment output only
		# pipe resultant jsx to new file name
		cat <<-_EOF_ >> $output_file
			<div>
			$content
			</div>
		_EOF_

	elif [ "$2" == "html" ]; then
		# create as independent html page
		# pipe resultant html to new file name
		cat <<- _EOF_ >> $output_file
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<html>
			<head>
				<title>$title</title>
				<link rel="stylesheet" href="res/github-markdown.css">
				<link rel="stylesheet" href="res/ga_pages.css">
				<style>
					.markdown-body {
						box-sizing: border-box;
						min-width: 200px;
						max-width: 1100px;
						margin: 0 auto;
						padding: 45px;
					}

					@media (max-width: 767px) {
						.markdown-body {
							padding: 15px;
						}
					}
				</style>
			</head>
			<body>
				<article class="markdown-body">
					$content
				</article>
			</body>
			<footer>Updated on $DATE by $AUTHOR.</footer>
			</html>
		_EOF_
	fi

done

echo "Docs generated."
