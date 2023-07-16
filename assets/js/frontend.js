document.addEventListener('DOMContentLoaded', function() {

    var descriptionElements = document.querySelectorAll('.air-telegramm[data-phrases]');

    descriptionElements.forEach(function(element) {
        var phrases = JSON.parse(element.getAttribute('data-phrases'));
        var paragraphElement = element.querySelector('.air-telegramm__right > p');

        if (phrases.length > 0 && paragraphElement) {
            var currentIndex = -1;

            function getRandomIndex() {
                var newIndex = Math.floor(Math.random() * phrases.length);
                while (newIndex === currentIndex) {
                    newIndex = Math.floor(Math.random() * phrases.length);
                }
                currentIndex = newIndex;
                return currentIndex;
            }

            function animateText() {
                element.classList.remove('air-tg-show');
                setTimeout(function() {
                    currentIndex = getRandomIndex();
                    paragraphElement.textContent = phrases[currentIndex];
                    element.classList.add('air-tg-show');
                }, 1000);
            }

            setTimeout(function() {
                animateText();
                setInterval(animateText, 5000);
            }, 5000);
        }
    });

    var telegramGroupLinks = document.querySelectorAll('a.wp-block-air-gut-tg-telegram-group');

    telegramGroupLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            var width = 600;
            var height = 600;

            var left = (window.innerWidth - width) / 2;
            var top = (window.innerHeight - height) / 2;

            var link = this.getAttribute('href');
            console.log(link);
            var features = 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top;
            var newWindow = window.open('', '_blank', features);
            newWindow.location.href = link;
        });
    });
});
