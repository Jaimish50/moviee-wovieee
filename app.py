# import eventlet
# eventlet.monkey_patch()

from flask_socketio import SocketIO, emit, join_room

from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import statistics

import cv2
import mediapipe as mp
from threading import Event
import math

from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS

socketio = SocketIO(app,async_mode='gebvent', cors_allowed_origins="*")

# Replace 'YOUR_TMDB_API_KEY' with your actual TMDB API key
API_KEY = os.getenv("TMDB_API_KEY")

@app.route("/<media_type>/<category>",methods=['GET'])
def get_tmdb_data(media_type, category):
   base_url = 'https://api.themoviedb.org/3'
   endpoint = f'/trending/{media_type}/week' if category == 'trending' else f'/{media_type}/top_rated'

   imdb_data = []
   for page in range(1,2):
      url = f'{base_url}{endpoint}?api_key={API_KEY}&region=IN&page={page}'
      response = requests.get(url,timeout=10)
      data = response.json()

      for item in data['results']:
            tmdb_id = item['id']
            title = item.get('title') or item.get('name')
            # rating = item.get('vote_average')
            # vote_count = item.get('vote_count')
            # release_date = item.get('release_date')
            poster_path = item.get('poster_path')
            # status= item.get('status')
            # starting_date= item.get('first_air_date')
            # popularity= item.get('popularity')
            language= item.get('original_language')
            genre_id= item.get('genre_ids')
            backdrop_path= item.get('backdrop_path')

            imdb_data.append({
                'title': title, 
                'id': tmdb_id, 
                # 'rating':rating, 
                # 'vote_count': vote_count, 
                # 'release_date': release_date,
                'poster_path': poster_path,
                # 'status': status,
                # 'first_air_date' : starting_date,
                # 'popularity' : popularity,
                'language': language,
                'genre_id': genre_id,
                'backdrop_path': backdrop_path
            })

   return imdb_data

@app.route("/search/<media_type>/<id>", methods={'GET'})
def search_movie(media_type,id):
  
  def get_movie_details(id):
    url = f"https://api.themoviedb.org/3/{media_type}/{id}?api_key={API_KEY}"  
    response = requests.get(url,timeout=10)
    movie_details = response.json()
    return movie_details
  def get_movie_credits(id):
    url = f"https://api.themoviedb.org/3/{media_type}/{id}/credits?api_key={API_KEY}"  
    response = requests.get(url,timeout=10)
    movie_credits = response.json()
    return movie_credits
  def get_movie_videos(id):
    url = f"https://api.themoviedb.org/3/{media_type}/{id}/videos?api_key={API_KEY}"  
    response = requests.get(url,timeout=10)
    movie_videos = response.json()
    return movie_videos
  def get_movie_images(id):
    url = f"https://api.themoviedb.org/3/{media_type}/{id}/images/?api_key={API_KEY}"  
    response = requests.get(url,timeout=10)
    movie_images = response.json()
    return movie_images
  def get_movie_reviews(id):
    url = f"https://api.themoviedb.org/3/{media_type}/{id}/reviews?api_key={API_KEY}"  
    response = requests.get(url,timeout=10)
    movie_reviews = response.json()
    return movie_reviews
  def get_movie_similar(id):
    url = f"https://api.themoviedb.org/3/{media_type}/{id}/similar?api_key={API_KEY}"  
    response = requests.get(url,timeout=10)
    movie_similar = response.json()
    return movie_similar
  def get_movie_recommendations(id):
    url = f"https://api.themoviedb.org/3/{media_type}/{id}/recommendations?api_key={API_KEY}"  
    response = requests.get(url,timeout=10)
    movie_recommendations = response.json()
    return movie_recommendations
  def get_external_ids(id):
    url = f"https://api.themoviedb.org/3/{media_type}/{id}/external_ids?api_key={API_KEY}"
    response = requests.get(url, timeout=10)
    external_ids = response.json()
    return external_ids
  
  details = get_movie_details(id)
  credits = get_movie_credits(id)
  videos = get_movie_videos(id)
  images = get_movie_images(id)
  reviews = get_movie_reviews(id)
  similar = get_movie_similar(id)
  recommendations = get_movie_recommendations(id)
  external_ids = get_external_ids(id)

  def isAnimeOrNot():
     genres = details["genres"]
     for genre in genres:
        if genre["id"] == 16:
           return True

  isAnime = False if media_type == "movie" else  isAnimeOrNot()

  casts = credits["cast"]
  main_cast = casts[:6]

  crews = credits["crew"]
  directors = [crew for crew in crews if crew["department"] == "Directing"]
  directors_info = []
  for director in directors:
     data = {
        "name": director["name"],
        "profile_path": director["profile_path"]
     }
     directors_info.append(data)
  
  writers = [crew for crew in crews if crew["department"] == "Writing"]
  writers_info = []
  for writer in writers:
     data = {
        "name": writer["name"],
        "profile_path": writer["profile_path"]
     }
     writers_info.append(data)

  
  reviews_data = reviews["results"]
  review = reviews_data[:10]

  similar_movies = similar["results"][:6]
  similar_movies_info = []
  for movie in similar_movies:
     data = {
        "id": movie["id"],
        "poster_path": movie["poster_path"],
        "title": movie.get("title") or movie.get("name")
     }
     similar_movies_info.append(data)

  recommendations_movies = recommendations["results"][:6]
  recommendations_movies_info = []
  for movie in recommendations_movies:
     data = {
        "id": movie["id"],
        "poster_path": movie["poster_path"],
        "title": movie.get("title") or movie.get("name")
     }
     recommendations_movies_info.append(data)
  array_of_runtime = details.get("episode_run_time") or []
  average_run_time =0
  if len(array_of_runtime) > 0:
    average_run_time = statistics.mean(array_of_runtime)

  data = {
        "id": details["id"],
        "backdrop_path": details['backdrop_path'],
        "poster_path" : details["poster_path"],
        "rating": details["vote_average"],
        "runtime": details.get("runtime") or average_run_time,
        "tagline": details["tagline"],
        "vote_count": details["vote_count"],
        "release_date": details["release_date"] or f'{details["first_air_date"]} to {details["last_air_date"]}' or "",
        "status": details["status"],
        "story": details["overview"],
        "language": details["original_language"],
        "title": details.get("title") or details.get("name"),
        "genres": details["genres"],
        "cast": main_cast,
        "directors": directors_info,
        "writers": writers_info,
        "reviews": review,
        "similar_movies": similar_movies_info,
        "recommendations_movies": recommendations_movies_info,
        "media": videos["results"][:5],
        "images": images,
        "media_type": media_type,
        "isAnime": isAnime,
        "imdb_id": external_ids.get("imdb_id") or "",
        "adult" : details.get("adult") or False
  }

  return jsonify(data)

@app.route("/keyword/<query>/<page>", methods=["GET"])
def search_movies(query,page):
  url = f"https://api.themoviedb.org/3/search/multi?api_key={API_KEY}&query={query}&include_adult=true&page={page}"
  response = requests.get(url, timeout=10)
  search_data = response.json()
  total_pages = search_data.get("total_pages") or 1 
  results = search_data.get("results")

  data = []
  for result in [el for el in results if el.get("media_type") and el["media_type"] != "person"]:
    release_date = result.get("release_date") or result.get("first_air_date")
    date = release_date[:4] if release_date else ""
    data.append({
        "id" : result.get("id") or "",
        "title": result.get("title") or result.get("name") or "",
        "poster_path": result.get("poster_path") or "",
        "rating": result.get("vote_average") or 0,
        "adult": result.get("adult") or False,
        "date": date,
        "media_type": result.get("media_type") or "movie"  
    })

  return jsonify({
     "data": data,
     "total_pages": total_pages
  })

@app.route("/explore", methods=["GET"])
def get_movies_by_filter():
   genres = request.args.get('genres')
   sort = request.args.get('sort')
   media_type = request.args.get('media_type')
   isAnime = request.args.get('isAnime')
   page = request.args.get('page')
   length = request.args.get('length')
   rating = request.args.get('rating');
   print("")
   print("")
   print(genres, sort, media_type, isAnime, page)

   if isAnime == "true": 
      if genres == "" : genres = "16" 
      else : genres += ",16"

   print("genres :", genres)
    # Join genre IDs with commas for TMDB API
   # genre_ids = ','.join(genres) if genres else ""
   # print("genre_ids : ",genre_ids)

   base_url = "https://api.themoviedb.org/3/discover/"

   endpoint = f"{media_type}?api_key={API_KEY}&include_adult=false&include_video=true&page={page}&sort_by={sort}"
   
   if genres:
    endpoint += f"&with_genres={genres}"
   
   

   extra = ""
   if media_type == "movie":
      extra = "&release_date.gte=1990-01-02&release_date.lte=2024-02-20"
   else : 
      if isAnime == "true":
         extra = ""
      else :
         extra = "&first_air_date.gte=1990-01-02&first_air_date.lte=2024-12-20"

   runtime = ""
   if length == "1" :
      runtime = "&with_runtime.lte=89"
   else :
      if length == "2":
         runtime = "&with_runtime.gte=90&with_runtime.lte=120"
      else : 
         if length == "3":
            runtime = "&with_runtime.gte=121"
   

   voting = ""
   if rating == "1":
      voting = "&vote_average.gte=8"
   else :
      if rating == "2":
         voting = "&vote_average.gte=6&vote_average.lte=7.9999"
      else :
         if rating == "3":
            voting= "&vote_average.lte=5.999"

   url = f"{base_url}{endpoint}{extra}{runtime}{voting}"

   print(url)

   response = requests.get(url, timeout=10)
   search_data = response.json()
   results = search_data.get("results")
   total_pages = search_data.get("total_pages") or 1
   print("total_pages : ", total_pages)

   films = []
   DATA = {"totalPages" : total_pages}
   
   for result in results:
      release_date = result.get("release_date") or result.get("first_air_date")
      date = release_date[:4] if release_date else ""
      films.append({
          "id" : result.get("id") or "",
          "title": result.get("title") or result.get("name") or "",
          "poster_path": result.get("poster_path") or "",
          "rating": result.get("vote_average") or 0,
          "adult": result.get("adult") or False,
          "date": date,
          "media_type": media_type,
          "length": result.get("runtime") 
      })
   DATA["data"] = films
   return jsonify(DATA)

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

hands = mp_hands.Hands(max_num_hands=1,
                       min_detection_confidence=0.6,
                       min_tracking_confidence=0.5)

# Thread-safe flag for enabling/disabling gestures
disable_event = Event()
disable_event.set()  # Start with gesture detection disabled

# disable = True

@socketio.on("join_room")
def handle_join_room(data):
   join_room(data.get("room"))
   print("joined the room : ",data.get("room"))

mode = "home"

@socketio.on("set_mode")
def handle_mode(data):
   global mode
   mode = data.get("mode")
   print("mode is set to : ", mode)

@socketio.on('disable')
def handle_disable(data):
   global disable_event
   if not data or 'msg' not in data:
        print("Invalid data received:", data)
        return
   # global disable
   print("Disable event received with:", data)
   print(data)
   print(" disable variable change to : ", data['msg'])
   if data['msg']:
      disable_event.set()
   else:
      disable_event.clear()
   

camera_active = False
cap = None

def count_extended_fingers(hand_landmarks):
    tips_ids = [8, 12, 16, 20]
    pip_ids = [6, 10, 14, 18]
    extended_fingers = 0

    for tip_id, pip_id in zip(tips_ids, pip_ids):
        if hand_landmarks.landmark[tip_id].y < hand_landmarks.landmark[pip_id].y:
            extended_fingers += 1

    return extended_fingers

# draw_points = []

def detect_gestures():
    global cap, camera_active, disable_event

    window_name = "Hand Tracker"
    cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)
    cv2.resizeWindow(window_name, 480, 360)
    while True:
        if disable_event.is_set():
            if camera_active:
                print("Disabling camera for privacy 👁️‍🗨️")
                cap.release()
                camera_active = False
            socketio.sleep(0.1)
            continue

        if not camera_active:
            print("Enabling camera back again 🔥")
            cap = cv2.VideoCapture(0)
            if not cap.isOpened():
                print("Camera failed to start 💀")
                socketio.sleep(1)
                continue
            camera_active = True
        
        ret, frame = cap.read()
        if not ret:
            print("Camera not working")
            break

        frame = cv2.flip(frame, 1)
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = hands.process(rgb)

        if result.multi_hand_landmarks:
            for hand_landmarks in result.multi_hand_landmarks:
                mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

                if mode == "draw" :
                  print(" i am in mode draw ")
                  thumb_tip = hand_landmarks.landmark[4]
                  index_tip = hand_landmarks.landmark[8]

                  dist = math.sqrt(((thumb_tip.x - index_tip.x)**2) + ((thumb_tip.y - index_tip.y)**2) + ((thumb_tip.z - index_tip.z)**2))

                  if dist < 0.1:
                     print("hello",dist)
                     #socketio.emit('gesture', {'type': 'draw', 'point': (x, y), 'stop': True}, room='streaming')
                     continue

                  print("index_tip", index_tip)
                  x = int(index_tip.x * frame.shape[1])
                  y = int(index_tip.y * frame.shape[0])

                  print("x cordinate is : ",x)
                  print("y cordinate is : ",y)
                  # draw_points.append((x, y))
                  socketio.emit('gesture', {'type': 'draw', 'point': (x, y), 'stop': False}, room='streaming')
                   
                elif mode == "home" :
                  # draw_points.clear()
                  fingers = count_extended_fingers(hand_landmarks)
                  
                  if fingers >= 4:
                    socketio.emit('gesture', {'type': 'scroll', 'dir': 'right'})
                  elif fingers <= 1:
                    socketio.emit('gesture', {'type': 'scroll', 'dir': 'left'})   

        cv2.imshow(window_name, frame)

        if cv2.waitKey(1) & 0xFF == 27:  # ESC key to exit
            break

        socketio.sleep(0.05)

    cap.release()
    cv2.destroyAllWindows()


@app.route('/gestures')
def index():
    socketio.emit('gesture',{"type": "test"})
    return "Gesture server running"

socketio.start_background_task(detect_gestures)

@app.route('/')
def index():
    return "Gesture server is running 🔥"
