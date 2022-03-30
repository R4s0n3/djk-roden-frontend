import React from 'react';
import './PostGrid.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
const PostGrid = props => {
    

    return(
        <div className="post-grid">
        <div className="post-grid__col-long">
            <Card className="post-grid__card"></Card>
            <Card className="post-grid__card"></Card>
            <Card className="post-grid__card"></Card>
        </div>
        <div className="post-grid__col-short">
        <Card className="post-grid__card-short"></Card>
        <Card className="post-grid__card-short"></Card>
        <div>
        <Button to="/posts">Mehr Posts</Button>

        </div>
        </div>
        </div>
    )
}

export default PostGrid;

