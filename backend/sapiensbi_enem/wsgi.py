"""
WSGI config for sapiensbi_enem project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sapiensbi_enem.settings')

application = get_wsgi_application() 