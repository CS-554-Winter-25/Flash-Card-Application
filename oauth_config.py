import os

#Will need to get these out of the codebase!!!
client_id = os.environ.get('115245670253-l0hn80magke9s5orhrs7c8m5q4run172.apps.googleusercontent.com')
client_secret = os.environ.get('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')
redirect_callback = os.environ.get('http://localhost:5173/authorize/google')
authorization_base_url = 'https://accounts.google.com/o/oauth2/auth'
token_url = 'https://accounts.google.com/o/oauth2/token'