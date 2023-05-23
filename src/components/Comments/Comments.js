import react, { useState } from "react";

const Comments = (props) => {
    const token01 = localStorage.getItem('Token01');
    const user = localStorage.getItem('user');
    const commentArr = props.commentEach.comment;
    const [newComment, setComment] = useState('');

    const saveComment = async () => {
        var comm = {
            username: user,
            comment: newComment
        }
        commentArr.push(comm);

        const spinner = document.querySelector('#comment-spinner');
        spinner.classList.remove('d-none')

        await fetch(process.env.REACT_APP_SERVER_URL + '/comment', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token01
            },
            body: JSON.stringify({ data: { _id: props.commentEach._id, comment: commentArr } }),
        }).then(res => res.json())
            .then(data01 => {
                console.log(data01);
                spinner.classList.add('d-none')
                setComment('')
                props.setSeed(Math.random())
            }).catch(err => {
                console.log(err);
                spinner.classList.add('d-none')

            })
    }
    return (
        <div>
            <div class="modal fade" id="commentModal" tabindex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="commentModalLabel">Comments</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {(token01) ?

                            <div className="p-3 border-bottom text-start pb-2">
                                <div class="form-floating">
                                    <input type="text" class="form-control" id="floatingComment" placeholder="New Comment" onChange={(e) => {
                                        setComment(e.target.value)
                                    }} value={newComment} required />
                                    <label for="floatingComment">New Comment</label>
                                </div>
                                <button className='btn btn-primary rounded-4 px-3 mt-2' onClick={saveComment}>
                                    Add Comment
                                    <div id='comment-spinner' class="d-none spinner-border spinner-border-sm ms-2"></div>

                                </button>
                            </div> : null}
                        <div class="modal-body text-start" style={{ maxHeight: '500px', overflow: 'auto' }}>
                            {[...commentArr].reverse().map((eachCom) => {
                                return (
                                    <>
                                        <div>
                                            <div className="fw-semibold">
                                                {eachCom.username}
                                            </div>
                                            <div>
                                                {eachCom.comment}
                                            </div>
                                        </div>
                                        <hr className="mt-2" />
                                    </>
                                )
                            })}

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Comments;