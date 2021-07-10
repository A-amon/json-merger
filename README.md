# JSON Merger

Merge 2 or more JSON files easily\
And only preserve the keys needed

## How to use
Create a config as shown below:
| key      | description                 |
|----------|-----------------------------|
|filename  |Name of merged file          |
|sources   |JSON files to be merged      |
|identifier|Uniquely identify each record|
|keys      |Needed keys from each source |

Config
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

fileA.json
```
[
    {
        "id": 1,
        "num": "001",
        "name": "Bulbasaur",
        "img": "http://www.serebii.net/pokemongo/pokemon/001.png",
     ...
```
fileB.json
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
