document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postList = document.getElementById('post-list');

    // Fetch and display posts
    fetch('/api/posts')
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                displayPost(post);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));

    // Handle form submission
    postForm.addEventListener('submit', event => {
        event.preventDefault();
        const title = postForm.title.value;
        const content = postForm.content.value;

        const newPost = { title, content };

        fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
        .then(response => response.json())
        .then(post => {
            displayPost(post);
            postForm.reset();
        })
        .catch(error => console.error('Error adding post:', error));
    });

    // Display a post
    function displayPost(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;
        postList.appendChild(postDiv);
    }
});
