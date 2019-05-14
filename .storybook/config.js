import { configure } from '@storybook/react'
import { addDecorator } from '@storybook/react'
import { withConsole } from '@storybook/addon-console'//console
import { withA11y } from '@storybook/addon-a11y'
import { addParameters } from '@storybook/react'
import { withTests } from '@storybook/addon-jest'
import { withPropsTable } from 'storybook-addon-react-docgen'
import { withKnobs } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'
import results from '../jest-test-results.json'
import '../src/index.less'
const newViewports = {
    kindleFire2: {
      name: 'Kindle Fire 2',
      styles: {
        width: '600px',
        height: '963px',
      },
    },
    kindleFireHD: {
      name: 'Kindle Fire HD',
      styles: {
        width: '533px',
        height: '801px',
      },
    },
  };

function loadStories() {
  require('../stories/index.js');
  // require('../stories/panel.stories.js');
  require('../packages/components/modules/AdvancedSearch/__stories__/advancedSearch.stories.js')
  // require('../packages/components/modules/Panel/__stories__/Panel.stories.js')
  // You can require as many stories as you need.
}

addDecorator(withSmartKnobs)
addDecorator(withKnobs)
addDecorator(withPropsTable)
addDecorator(withTests({results}));//jest
addDecorator((storyFn, context) => withConsole()(storyFn)(context));//console
addDecorator(withA11y)//ally
addParameters({ viewport: newViewports });//view

configure(loadStories, module);
