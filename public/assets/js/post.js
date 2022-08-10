const commentInputEl = document.getElementById('comment-input');
const commentButtonEl = document.getElementById('comment-button');

const postComment = async (event) => {
    event.preventDefault();
    const postID = window.location.pathname.substring(7);
    console.log(postID);
    const comment = {
        comment: commentInputEl.value,
        postID: postID,
    }
    try {
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });
        await response.json();
        window.location.reload();
    } catch(error) {
        console.error(error);
    }

}

commentButtonEl.addEventListener('click', postComment);

