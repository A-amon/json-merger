# JSON Merger

A VsCode extension to:

* Merge 2 or more JSON files easily
* Only preserve the keys needed

## How to use
Create a config with following keys/values:
| key      | description                 |
|----------|-----------------------------|
|filename  |Name of merged file          |
|sources   |JSON files to be merged      |
|identifier|Uniquely identify each record|
|keys      |Needed keys from each source |

**Note:** Few things to make sure before running the extension
* Config syntax is correct(proper JSON syntaxes)
* Source files are in same directory as config

**Sample scenario:** Merge fileA.json and fileB.json with following requirements:
* Take *num, name, img, weaknesses, next_evolution* values from fileA.json
* Take *type, base* from fileB.json

### Config
```
{
    "filename":"test",
    "sources":["fileA.json","fileB.json"],
    "identifier":"id",
    "keys":{
        "fileA":["num", "name", "img","weaknesses","next_evolution"],
        "fileB":["type","base"]
    }
}
```
### Files to merge

fileA.json (Credits to [Pokedex.json](https://github.com/Biuni/PokemonGO-Pokedex/blob/master/pokedex.json))
```
[
    {
        "id": 1,
        "num": "001",
        "name": "Bulbasaur",
        "img": "http://www.serebii.net/pokemongo/pokemon/001.png",
     ...
```
fileB.json (Credits to [Pokemon.json](https://github.com/fanzeyi/pokemon.json/blob/master/pokedex.json))
```
[
    {
        "id": 1,
        "name": {
            "english": "Bulbasaur",
            "japanese": "フシギダネ",
            "chinese": "妙蛙种子",
            "french": "Bulbizarre"
        },
       ...
```

### Result
test.json
```
[
    {
        "id": 1,
        "num": "001",
        "name": "Bulbasaur",
        "img": "http://www.serebii.net/pokemongo/pokemon/001.png",
        "weaknesses": [
            "Fire",
            "Ice",
         ...
```
