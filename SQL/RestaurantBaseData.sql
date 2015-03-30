INSERT INTO RestaurantTypes
VALUES (uuid(), 'Sit-Down'),
(uuid(), 'Buffet'),
(uuid(), 'Diner'),
(uuid(), 'Fast Food');

INSERT INTO RestaurantEthnicities
VALUES (uuid(), 'Mexican'),
(uuid(), 'American'),
(uuid(), 'Asian'),
(uuid(), 'Italian');

INSERT INTO Restaurants
VALUES (
	uuid(),
    'Seasons of Japan',
    '8f5ca190-d661-11e4-9b5d-bc5ff4664825', #Diner
    '0528f84b-d662-11e4-9b5d-bc5ff4664825', #Asian
    1
), (
	uuid(),
    'Chipotle',
    '8f5ca190-d661-11e4-9b5d-bc5ff4664825', #Diner
    '052505b6-d662-11e4-9b5d-bc5ff4664825', #Mexican
    1
), (
	uuid(),
    'Tijuana Flats',
    '8f5ca190-d661-11e4-9b5d-bc5ff4664825', #Diner
    '052505b6-d662-11e4-9b5d-bc5ff4664825', #Mexican
    1
), (
	uuid(),
    'Moxie',
    '8f5a1811-d661-11e4-9b5d-bc5ff4664825', #Sit-Down
    '0528f6ff-d662-11e4-9b5d-bc5ff4664825', #American
    1
);

INSERT INTO RestaurantLocations
VALUES (
	uuid(),
    (SELECT RestaurantID FROM Restaurants WHERE RestaurantName = 'Seasons of Japan'),
    'Jacksonville',
    'Florida',
    '32246',
    '4413 Town Center Parkway'
), (
	uuid(),
    (SELECT RestaurantID FROM Restaurants WHERE RestaurantName = 'Tijuana Flats'),
    'Jacksonville',
    'Florida',
    '32224',
    '13529 Beach Boulevard'
), (
	uuid(),
    (SELECT RestaurantID FROM Restaurants WHERE RestaurantName = 'Tijuana Flats'),
    'Jacksonville',
    'Florida',
    '32224',
    '2025 Riverside Avenue'
), (
	uuid(),
    (SELECT RestaurantID FROM Restaurants WHERE RestaurantName = 'Moxie'),
    'Jacksonville',
    'Florida',
    '32246',
    '4972 Big Island Drive'
);

INSERT INTO Users
VALUES (
	'potato',
    'potato',
    0
), (
	'test',
    'test',
    1
);

INSERT INTO RestaurantRatings
VALUES (
	'87ae854c-d680-11e4-9b5d-bc5ff4664825', #Moxie
	'test',
    2,
    4,
    0,
    2,
    1,
    ''
), (
	'87ab75b0-d680-11e4-9b5d-bc5ff4664825', #Seasons of Japan
	'test',
    2,
    1,
    1,
    2,
    2,
    'Lovely wait staff, friendly atmosphere!'
), (
	'87ae8380-d680-11e4-9b5d-bc5ff4664825', #Tijuana Flats
	'test',
    2,
    3,
    4,
    2,
    3,
    'Best restaurant in town, dollar for dollar!'
), (
	'87ae84c2-d680-11e4-9b5d-bc5ff4664825', #Tijuana Flats
	'test',
    2,
    2,
    4,
    2,
    2,
    'Not as good as the one on Beach, but the foods almost as good and the girls are almost as cute!'
), (
	'87ab75b0-d680-11e4-9b5d-bc5ff4664825', #Seasons of Japan
	'potato',
    3,
    2,
    2,
    2,
    2,
    'The tofu here is AUHMAZIN! Ermahgerd. ~Josh'
);