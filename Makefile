build:
	cp src/message.js messageCompile
	touch message
	echo '#!/bin/bash' > message
	echo 'node' 'messageCompile' >> message
	chmod +x message
	cp src/forest.js forestCompile
	touch forest
	echo '#!/bin/bash' > forest
	echo 'node' 'forestCompile' >> forest
	chmod +x forest
	cp src/race.js raceCompile
	touch race
	echo '#!/bin/bash' > race
	echo 'node' 'raceCompile' >> race
	chmod +x race

clean:
	rm -rf message
	rm -rf messageCompile
	rm -rf forest
	rm -rf forestCompile
	rm -rf race
	rm -rf raceCompile

