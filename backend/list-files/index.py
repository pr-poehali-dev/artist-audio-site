import os
import json

def handler(event: dict, context) -> dict:
    """Возвращает AWS_ACCESS_KEY_ID для построения CDN-ссылок на аудиофайлы"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}, 'body': ''}

    key_id = os.environ.get('AWS_ACCESS_KEY_ID', '')

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'key_id': key_id})
    }
