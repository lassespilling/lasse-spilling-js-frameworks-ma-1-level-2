# Custom unsplash slider
Custom unsplash image gallery slider created using jQuery, jQuery transit and buit with parcel. 

### Demo:
[-- View Demo --](https://lasse.media/experiments/jquery-slider/)

###  Building from src
```
npm -i
```
```
npm run prod
```

### Dependencies:
* [jQuery](https://www.npmjs.com/package/jquery) - Javascript framework
* [jQuery transit](https://www.npmjs.com/package/jquery.transit) - Transitions addon for jQuery
* [parcel-bundler](https://parceljs.org/) - Bundler
* [sass](https://www.npmjs.com/package/sass) - Sass compiler


##  Creating a gallery:


### Basic setup
###### Add CSS
```html
<link rel="stylesheet" href="css/main.scss">
```
###### Add HTML
```html
<div class="slider-container">
	<div class="slider">
        <div class="slider__roller">
            <img src="" alt=""/>
			<img src="" alt=""/>
			<img src="" alt=""/>
		</div>
	</div>
</div>
```
* Empty **src** tag automagically loads images from [unsplash.com](unsplash.com)
* Empty **alt** tag automagically defaults to "slide1", "slide2" etc.
###### Add Javascript
```html
<script src="js/index.js"></script>
```
### Advanced setup
```html
<div class="slider-container" data-settings="controls, blurbg, instructions" data-blur="5">
	<div class="slider">
        <div class="slider__roller">
            <img src="" alt=""/>
            <img src="" alt=""/>
            <img src="" alt=""/>
        </div>
    </div>
</div>
```

| name        | parameter | what it does | default
| :------------- |:------------- |:------------- |:------------- |
| ***data-settings***      | blurbg | adds blurred bg image behind slider | off
| ***data-settings***      | instructions | adds instructions before slider | off
| ***data-settings***      | controls | adds controls and numbering | off
| ***data-sliding***      | true or false | toggle sliding of images | on
| ***data-blur***      | any whole number (1-100) | adjusts blur amount of background | 5

##### Supported by:
* Chrome
* Safari

##### Not supported by:
* ~~firefox~~
* ~~IE~~ (not yet tested)
* ~~Opera~~ (not yet tested)