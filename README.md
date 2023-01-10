# taxomplete [![Build Status](https://travis-ci.org/plazi/taxomplete.svg?branch=master)](https://travis-ci.org/plazi/taxomplete)

Provides a text field to select a biological species.

It uses [Awesomplete](https://leaverou.github.io/awesomplete/) autocomplete widget and accesses [plazi](http://www.plazi.org/)
data on the [LINDAS Linked Data Service](https://lindas-data.ch/).

## Usage

Import the script as with: 

```
<script src="https://plazi.github.io/taxomplete/taxomplete.js"></script>
```

You probably also want to use a css
```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.2/awesomplete.css" crossorigin="anonymous" />
```

To activate the widget on a text field with id `species-input` you could use the following code:

``` 

<script>
    let input = document.getElementById("species-input");
    let taxomplete = new Taxomplete(input);
    taxomplete.action = function(value) {
        alert(value);
    }
</script>
```

Try it out: https://plazi.github.io/taxomplete/