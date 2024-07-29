from flask import Blueprint, request, jsonify
from models import db, Job
from datetime import datetime

job_endpoint = Blueprint('job_endpoint', __name__)



@job_endpoint.route('/add_job', methods=['POST'])
def add_job():
    data = request.get_json()
    new_job = Job(
        position=data['position'],
        description=data['description'],
        responsibility=data['responsibility'],
        qualification=data['qualification'],
        benefits=data['benefits'],
        job_type=data['job_type'],
        job_category=data['job_category'],
        location=data['location']
    )
    db.session.add(new_job)
    db.session.commit()
    return jsonify({'message': 'Job added successfully'}), 201


@job_endpoint.route('/get_jobs', methods=['GET'])
def get_jobs():
    jobs = Job.query.all()
    jobs_list = []
    for job in jobs:
        jobs_list.append({
            'id': job.id,
            'position': job.position,
            'description': job.description,
            'responsibility': job.responsibility,
            'qualification': job.qualification,
            'benefits': job.benefits,
            'job_type': job.job_type,
            'job_category': job.job_category,
            'location': job.location
        })
    return jsonify(jobs_list), 200