#coding: utf8
import sys
import re
from graphviz import Source

assert (len(sys.argv) > 1), "Please specify an input file."

## Getting the content of the file
f = open(sys.argv[1], 'r')

content = f.read()

f.close()

## Keeping only the tags
tags = re.findall(r'<[\S\s]*?/?>', content)

stripped = '\n'.join(tags)

stripped = re.sub(r'(<\S*) [\S\s]*?(/?>)', r'\1\2', stripped)

stripped = re.sub(r'<[!\?]\S*>\s*', '', stripped)

stripped = re.sub(r'<(.*?)>', r'\1', stripped)
print stripped


## Creating the DOT graph
path = []
graph = ""
graph += "digraph dom {\n"
tags_list = stripped.split('\n')
tags_dic = {i:tags_list[i] for i in range(len(tags_list))}

for number, tag in zip(range(len(tags_list)), tags_list):
	if(not("/" in tag)):
		graph += str(number)+ " [label=\""+tag+"\"];\n"

for number, tag in zip(range(len(tags_list)), tags_list):
	if '/' in tag:
		path = path[:-1]
	elif len(path) > 0:
		print path
		graph += str(path[-1][0])+"-> "+str(number) + ";\n"
		path.append((number, tag))
	else: 
		path.append((number, tag))
		
graph += "}"
print graph


Source(graph).render('test', view=True)
