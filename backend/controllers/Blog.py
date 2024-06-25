from flask import Blueprint, request, jsonify
from models import db, Blog
from datetime import datetime

blog_endpoint = Blueprint('blog_endpoint', __name__)


@blog_endpoint.route('/add_blog', methods=['POST'])
def add_blog():
    data = request.get_json()
    new_blog = Blog(title=data['title'], content=data['content'])
    db.session.add(new_blog)
    db.session.commit()
    return jsonify({"message": "Blog added successfully!"})


@blog_endpoint.route('/get_blogs', methods=['GET'])
def get_blogs():
    blogs = Blog.query.all()
    output = []
    for blog in blogs:
        blog_data = {'title': blog.title, 'content': blog.content,
                     'date_posted': blog.date_posted, 'id': blog.id}
        output.append(blog_data)
    return jsonify({"blogs": output})


@blog_endpoint.route('/blog/<int:id>', methods=['GET'])
def get_blog(id):
    blog = Blog.query.get_or_404(id)
    blog_data = {'id': blog.id, 'title': blog.title,
                 'content': blog.content, 'date_posted': blog.date_posted}
    return jsonify({"blog": blog_data})
