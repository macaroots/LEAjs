
import {Symbol, Link} from './../public/_js/ceed/brain.js';
import {FileBrain} from './../public/_js/ceed/file_brain.js';
import {shouldBehaveLikeABrain} from './test_brain.js';

describe('FileBrain', function() {
  shouldBehaveLikeABrain(() => new FileBrain('./test/test_agents/'));
});
