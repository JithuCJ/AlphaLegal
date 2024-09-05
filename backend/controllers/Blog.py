from flask import Blueprint, request, jsonify, send_from_directory, url_for
from models import db, Blog
import os
from werkzeug.utils import secure_filename
from datetime import datetime

blog_endpoint = Blueprint('blog_endpoint', __name__)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif', 'webp'}

@blog_endpoint.route('/add_blog', methods=['POST'])
def add_blog():
    data = request.form
    title = data['title']
    content = data['content']
    author = data.get('author', 'admin')  # Default to 'admin' if not provided
    image = request.files['image'] if 'image' in request.files else None

    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        image_path = os.path.join('static/uploads', filename)
        image.save(image_path)
        new_blog = Blog(title=title, content=content, image_file=filename, author=author)
    else:
        new_blog = Blog(title=title, content=content, author=author)

    db.session.add(new_blog)
    db.session.commit()
    return jsonify({"message": "Blog added successfully!"})

@blog_endpoint.route('/get_blogs', methods=['GET'])
def get_blogs():
    blogs = Blog.query.all()
    output = []
    for blog in blogs:
        image_url = url_for('static', filename=f'uploads/{blog.image_file}', _external=True) if blog.image_file else None
        blog_data = {
            'id': blog.id,
            'title': blog.title,
            'content': blog.content,
            'date_posted': blog.date_posted,
            'author': blog.author,
            'image_url': image_url
        }
        output.append(blog_data)
    return jsonify({"blogs": output})

@blog_endpoint.route('/blog/<int:id>', methods=['GET'])
def get_blog(id):
    blog = Blog.query.get_or_404(id)
    image_url = url_for('static', filename=f'uploads/{blog.image_file}', _external=True) if blog.image_file else None
    blog_data = {
        'id': blog.id,
        'title': blog.title,
        'content': blog.content,
        'date_posted': blog.date_posted,
        'author': blog.author,
        'image_url': image_url
    }
    return jsonify({"blog": blog_data})

@blog_endpoint.route('/static/uploads/<filename>')
def serve_image(filename):
    return send_from_directory('static/uploads', filename)
