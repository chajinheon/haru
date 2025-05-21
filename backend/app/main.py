from fastapi import FastAPI

from .database import init_db
from .routers import auth, users, todos, journals, notes, ai, stats # Import the new stats router
from .models import todo, journal, note, ai_feedback # Import all models to ensure tables are created
from sqlalchemy.sql import func # Import func for server_default in models

# Call init_db() to create database tables on startup
# In a production environment, you might want to use Alembic for migrations
init_db()

app = FastAPI()

app.include_router(auth.router, prefix="/api/v1")
app.include_router(users.router) 
app.include_router(todos.router) 
app.include_router(journals.router) 
app.include_router(notes.router) 
app.include_router(ai.router) 
app.include_router(stats.router) # Include the stats router

@app.get("/")
async def root():
    return {"message": "Hello World - API Root"}
