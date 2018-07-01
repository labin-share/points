from pymongo import MongoClient, ASCENDING

client = MongoClient('localhost', 27017)

points_db = None


def connect_db():
    global points_db
    points_db = client.points


def search(name=None, phone=None):
    query = {}
    if (name):
        query['name'] = name
    if (phone):
        query['phone'] = phone
    return points_db.customer.find(query).sort("name", ASCENDING)


def create(data):
    points_db.customer.insert(data)
    return None


def update(query, data):
    points_db.customer.update(query,{"$set":data})
    return None


if __name__ == '__main__':
    connect_db()
