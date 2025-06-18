# !/bin/bash

echo "🔥 Nuking old installs..."
pip uninstall -y eventlet gunicorn

echo "📦 Installing dependencies..."
pip install -r requirements.txt

echo "🔁 Reinstalling eventlet and gunicorn from scratch..."
pip install --no-cache-dir --force-reinstall eventlet==0.33.3 gunicorn
