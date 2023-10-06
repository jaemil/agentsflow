Steps:

```jsx
git clone autogen_ui
```

```jsx
conda create --name autogen python=3.9
```

```jsx
OPENAI_API_KEY;
```

```jsx
activate autogen
```

```jsx
conda install fastapi[all] websockets python-dotenv pip
```

```jsx
pip install pyautogen "pyautogen[blendsearch]"
```

```jsx
uvicorn main:app --reload
```
