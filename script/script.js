document.addEventListener('DOMContentLoaded', function () {
    const likeButtons = document.querySelectorAll('.like, .dislike');
    const likeCount = document.getElementById('like-count');
    const dislikeCount = document.getElementById('dislike-count');
    const dogImage = document.getElementById('dog-image');
    const wrongImg = document.querySelector('.wrong-img');
    const heartImg = document.querySelector('.heart-img');
    const likeCircle = document.querySelector('.like-circle');
    const dislikeCircle = document.querySelector('.dislike-circle');

    let likes = parseInt(localStorage.getItem('likes')) || 0;
    let dislikes = parseInt(localStorage.getItem('dislikes')) || 0;

    likeCount.textContent = likes;
    dislikeCount.textContent = dislikes;

    async function fetchDogImage() {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            if (data.status === 'success') {
                dogImage.src = data.message;
            }
        } catch (error) {
            console.error('Error fetching dog image:', error);
        }
    }

    fetchDogImage();

    likeButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (button.classList.contains('like')) {
                likes++;
                likeCount.textContent = likes;
                localStorage.setItem('likes', likes);
                likeCircle.classList.add('active');
                heartImg.classList.add('active');
                setTimeout(() => {
                    likeCircle.classList.remove('active');
                    heartImg.classList.remove('active');
                }, 1000);
            } else if (button.classList.contains('dislike')) {
                dislikes++;
                dislikeCount.textContent = dislikes;
                localStorage.setItem('dislikes', dislikes);
                dislikeCircle.classList.add('active');
                wrongImg.classList.add('active');
                setTimeout(() => {
                    dislikeCircle.classList.remove('active');
                    wrongImg.classList.remove('active');
                }, 1000);
            }

            fetchDogImage();

            button.classList.add('active');
            setTimeout(() => {
                button.classList.remove('active');
            }, 500);
        });
    });
});

