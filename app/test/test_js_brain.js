
import {Symbol, Link} from './../public/_js/ceed/brain.js';
import {JSBrain} from './../public/_js/ceed/jsbrain.js';
import {shouldBehaveLikeABrain} from './test_brain.js';

describe('JSBrain', function() {

  shouldBehaveLikeABrain(() => new JSBrain());
});
