
const vscode = require('vscode')
const fs = require('fs')

var folderPath

function activate (context) {
	let disposable = vscode.commands.registerCommand('json-merger.merge', function () {
		const editor = vscode.window.activeTextEditor
		const currentDoc = editor.document

		folderPath = getFolderPath(currentDoc.fileName)

		const { filename, sources, identifier, keys } = readContent(currentDoc)

		vscode.window.showInformationMessage(`Merging...`)

		readSources(sources, keys).then(sourcesData => {
			const mergedData = mergeData(sourcesData, keys, identifier)
			vscode.window.showInformationMessage('Finished merging!')

			writeToJson(filename, mergedData).then(() => {
				vscode.window.showInformationMessage(`${filename}.json created!`)
			}).catch(err => {
				vscode.window.showWarningMessage(`Error writing to file.`)
			})

		}).catch(err => {
			vscode.window.showWarningMessage(`Error merging. Please check source files.`)
		})

	});

	context.subscriptions.push(disposable);
}

//write data to json file
//use specified filename
function writeToJson (filename, data) {
	return new Promise((resolve, reject) => {
		fs.writeFileSync(`${folderPath}\\${filename}.json`, JSON.stringify(data, null, 4), (err) => {
			if (err) {
				reject(err)
			}
		})
		resolve()
	})
}

//merge different sources' data with specified keys
//return combined data
function mergeData (sourcesData, keys, identifier) {
	let mergedData = []
	const keySources = Object.keys(keys)

	sourcesData[getShortestSource(sourcesData)].forEach((sourceData, ind) => {
		let data = {}
		data[identifier] = sourceData[identifier]

		keySources.forEach(source => {
			for (let key of keys[source]) {
				data[key] = sourcesData[source][ind][key]
			}
		})
		mergedData.push(data)
	})

	return mergedData
}

//return source name with shortest length of data/array
function getShortestSource (sourcesData) {
	let shortestSource = Object.keys(sourcesData)[0]

	for (let source of Object.keys(sourcesData)) {
		if (sourcesData[source].length < sourcesData[shortestSource].length) {
			shortestSource = source
		}
	}

	return shortestSource
}

//return folder path of document
function getFolderPath (filepath) {
	const splitPath = filepath.split('\\')
	splitPath.pop()

	return splitPath.join('\\')
}

//read source files content
//return content in JSON format
function readSources (sources) {
	let sourceData = {}

	return new Promise(async (resolve, reject) => {
		for (let source of sources) {
			//wait for document to finish opening
			await vscode.workspace.openTextDocument(`${folderPath}\\${source}`).then(document => {
				sourceData[source.replace('.json', '')] = JSON.parse(document.getText())
			}).catch(err => {
				reject(err)
			})
		}
		resolve(sourceData)
	})

}

//read current document's content
//return content in JSON format
function readContent (document) {
	const content = document.getText()
	try {
		return JSON.parse(content)
	}
	catch (err) {
		vscode.window.showInformationMessage(`Error merging. Please check syntax.`)
	}
}

function deactivate () { }

module.exports = {
	activate,
	deactivate
}
