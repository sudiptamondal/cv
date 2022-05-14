

generateInnerHTML = function(year, obj) {

    let l_box = '<div style="flex-direction: column; padding-right: 10px;">'
    + '<h4>Major Roles Played</h4>'
    + '<ul class="ul_view__inner_content">'
    + obj["roles_played"].map(element => {
        return '<li>' + element +'</li>'
        }).join("")
    + '</ul>'
    + '<h4>Other Roles Played</h4>'
    + '<ul class="ul_view__inner_content">'
    + obj["other_roles_played"].map(element => {
        return '<li>' + element +'</li>'
        }).join("")
    + '</ul>'
    + '</div>';
    let r_box = '<div style="flex-direction: column; padding-left: 10px;">'
    + '<h4>Components</h4>'
    + '<ul class="ul_view__inner_content">'
    + obj["components"].map(element => {
        return '<li>' + element +'</li>'
        }).join("")
    + '</ul>'
    + '</div>';

    let l_box_2 = '';
    if (obj["impact"].length != 0) {
        l_box_2 = '<p style="border-top: solid 1px #000;width:  80%; margin: auto; margin-top:20px; "> </p>'
        + '<h3>How I made a difference</h3>'
        +  '<div>'
        + '<ul class="ul_view__inner_content">'
        + obj["impact"].map(element => {
            return '<li>' + element +'</li>'
            }).join("")
        + '</ul>'
        + '</div>';
    
    }


    let html_string  = '<div class="view view--1">'  
    + '<div class="view__inner view_custom">' 
    + '<div>'
    + '<h2 style="font-size: 60px">' + year + " - " + obj["position"] + '</h2>' 
    + '<div style="display: flex;">'
    + l_box
    + '<div style="flex-direction: column; border-right: solid 1px #000">&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/></div>'
    + r_box
    + '</div>'
    + '<div>'
    + l_box_2
    + '</div>'
    + '</div>'
    + '</div>';
    return html_string;
}


$(document).ready(function() {

    cv_data["years"].forEach(year => {
        $(".views").append(generateInnerHTML(year, cv_data["items"][year]))
    });

    
    let areClipPathShapesSupported = function() {

        let base = 'clipPath',
            prefixes = ['webkit', 'moz', 'ms', 'o'],
            properties = [base],
            testElement = document.createElement('testelement'),
            attribute = 'polygon(50% 0%, 0% 100%, 100% 100%)';

        // Push the prefixed properties into the array of properties.
        for (let i = 0, l = prefixes.length; i < l; i++) {
            let prefixedProperty = prefixes[i] + base.charAt(0).toUpperCase() + base.slice(1); // remember to capitalize!
            properties.push(prefixedProperty);
        }

        // Interate over the properties and see if they pass two tests.
        
        for (let i = 0, l = properties.length; i < l; i++) {
            let property = properties[i];

            // First, they need to even support clip-path (IE <= 11 does not)...
            if (testElement.style[property] === '') {

                // Second, we need to see what happens when we try to create a CSS shape...
                testElement.style[property] = attribute;
                if (testElement.style[property] !== '') {
                    return true;
                }
            }
        }
        

        return false;
    };

    let defaultSlickSpeed = 300;
    let firstSlide = cv_data["years"].length
    $('.views').slick({
        speed: defaultSlickSpeed,
        initialSlide: firstSlide - 1,
    }).on('beforeChange', (evt, slick, currentSlide, nextSlide) => {
        let delta = Math.abs(currentSlide - nextSlide);
        if (delta === slick.slideCount - 1) {
            delta = 1;
        }
        $('.views').slick('slickSetOption', 'speed', delta * defaultSlickSpeed);
    }).on('afterChange', (evt, slick, currentSlide) => {
        $('.views').slick('slickSetOption', 'speed', defaultSlickSpeed);
        $('.timeline__list').find('.timeline__item--active').removeClass('timeline__item--active');
        $('.timeline__list').find(`.timeline__item:nth-child(${currentSlide + 1})`).addClass('timeline__item--active');
    }).init(function() {
        $('.timeline__list').find('.timeline__item--active').removeClass('timeline__item--active');
        $('.timeline__list').find('.timeline__item:nth-child(' + firstSlide + ')').addClass('timeline__item--active');
        console.log('init called');
    });

    $('.timeline__link').on('click', evt => {
        evt.preventDefault();
        $('.timeline__item--active').removeClass('timeline__item--active');
        $(evt.currentTarget).parent().addClass('timeline__item--active');

        $('.views').slick('slickGoTo', $(evt.currentTarget).parent().prevAll('li').length);

    });

    let timelineOffset = $('.timeline').offset().left;
    let triangleWidth = $('.timeline__path__triangle--moving').outerWidth();

    $('.timeline').on('mousemove', evt => {
        let value = evt.pageX - timelineOffset - triangleWidth / 2;
        $('.timeline__path__triangle--moving').css({
            transform: `translateX(${value}px)`
        });

    });

    if (!areClipPathShapesSupported()) {
        $('body').addClass('no-clippath');
    } else {
        $('body').addClass('clippath');
    }


});
