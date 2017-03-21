/* eslint-env jasmine, jest */
import AsyncStorage from '..';

const waterfall = (fns, cb) => {
  const _waterfall = (...args) => {
    const fn = (fns || []).shift();
    if (typeof fn === 'function') {
      fn(...args, (err, ...nextArgs) => {
        if (err) {
          return cb(err);
        } else {
          return _waterfall(...nextArgs);
        }
      });
    } else {
      cb(null, ...args);
    }
  };
  _waterfall();
};

const obj = {};
const mockLocalStorage = {
  length: 0,
  getItem(key) {
    return obj[key];
  },
  setItem(key, value) {
    obj[key] = value;
    mockLocalStorage.length = Object.keys(obj).length;
  },
  key(index) {
    return Object.keys(obj)[index];
  }
};
const originalLocalStorage = window.localStorage;

describe('apis/AsyncStorage', () => {
  const UID123_object = {
    name: 'Chris',
    age: 30,
    traits: { hair: 'brown', eyes: 'brown' }
  };

  describe('getAllKeys', () => {
    beforeEach(async () => {
      window.localStorage = mockLocalStorage;
      await AsyncStorage.setItem('UID123', JSON.stringify(UID123_object));
    });

    afterEach(() => {
      window.localStorage = originalLocalStorage;
    });

    test('should have same Promise behavior as react-native', async () => {
      const keys = await AsyncStorage.getAllKeys();

      expect(keys).toEqual(['UID123']);
    });

    test('should have same callback behavior as react-native', async () => {
      let keys = null;

      await AsyncStorage.getAllKeys((result) => {
        keys = result;
      });

      expect(keys).toEqual(['UID123']);
    });
  });

  describe('mergeLocalStorageItem', () => {
    test('should have same behavior as react-native', done => {
      window.localStorage = mockLocalStorage;
      // https://facebook.github.io/react-native/docs/asyncstorage.html
      const UID123_delta = {
        age: 31,
        traits: { eyes: 'blue', shoe_size: 10 }
      };

      waterfall(
        [
          cb => {
            AsyncStorage.setItem('UID123', JSON.stringify(UID123_object))
              .then(() => cb(null))
              .catch(cb);
          },
          cb => {
            AsyncStorage.mergeItem('UID123', JSON.stringify(UID123_delta))
              .then(() => cb(null))
              .catch(cb);
          },
          cb => {
            AsyncStorage.getItem('UID123')
              .then(result => {
                cb(null, JSON.parse(result));
              })
              .catch(cb);
          }
        ],
        (err, result) => {
          expect(err).toEqual(null);
          expect(result).toMatchSnapshot();
          window.localStorage = originalLocalStorage;
          done();
        }
      );
    });
  });
});
