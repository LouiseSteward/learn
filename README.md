# Bettercare learning programmes

These books are created with the [Electric Book](http://electricbook.works), a Jekyll template for making books, ebooks and book-like websites.

## Usage

The staging site includes [the docs](https://fireandlion.github.io/learn/docs/).

The live website is hosted at [bettercare.co.za/learn](http://bettercare.co.za/learn). To build the HTML for the live website, *don't use the usual output script*. Instead:

1. Open a Terminal (or Command Prompt in Windows) in the `/learn` folder (or navigate to the folder in the Terminal, i.e. by using `cd`).
2. Then enter:

    ```
    $ bundle exec jekyll serve --config="_config.yml,_configs/_config.live.yml"
    ```

3. If you have errors, check that you have installed dependencies. The easiest way to do this is to run the usual output script and select the 'Install/update dependencies' option.

## Licence

This repository contains two licences:

- a [Creative Commons Attribution, Non-commercial, No-derivatives](https://creativecommons.org/licenses/by-nc-nd/3.0/) licence, which covers the Bettercare learning-programme content
- a GPL3 licence, which covers the software.
