import React from 'react'
import { Paragraph, Anchor, Text, Grommet, Main, Header, FileInput, List } from 'grommet';
import * as zip from '@zip.js/zip.js'
import reactDom from 'react-dom';
const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
    colors: {
      header: '#6600cc',
      landing: '#4d79ff',
      link: 'white',
    }
  },
};


//zip.js Example
async function parseZipContents(blob) {
  // create a BlobReader to read with a ZipReader the zip from a Blob object
  const reader = new zip.ZipReader(new zip.BlobReader(blob));

  // get all entries from the zip
  const entries = await reader.getEntries();
  if (entries.length) {

    // get first entry content as text by using a TextWriter
    const text = await entries[0].getData(
      // writer
      new zip.TextWriter(),
      // options
      {
        onprogress: (index, max) => {
          // onprogress callback
        }
      }
    );
    // text contains the entry data as a String
    return text;

  }

  // close the ZipReader
  await reader.close();
}

class Table extends React.Component {
  render() {
    return (
      <List
        primaryKey="name"
        secondaryKey="percent"
        data={[
          { name: 'Alan', percent: 20 },
          { name: 'Bryan', percent: 30 },
          { name: 'Chris', percent: 40 },
          { name: 'Eric', percent: 80 },
        ]}
      />
    );
  }
}

function App() {
  return (
    <Grommet theme={theme}>
      <Header background='header' pad='small'>
        <Text size='medium'>🏃</Text>
        <Anchor alignSelf='end' color='link' href="https://github.com/GrissomE">GrissomE</Anchor>
      </Header>
      <Main flex align='center' justify='center'>
        <Paragraph >Upload your Strava history to generate view</Paragraph>
        <FileInput name="Upload" multiple={false}
          onChange={event => {
            if (event.target.files) {
              const fileList = event.target.files;
              for (let i = 0; i < fileList.length; i += 1) {
                const file = fileList[i];
              }
              parseZipContents(fileList[0]).then(val => {
                reactDom.render(< Table contents={val} />, document.getElementById('table'))
              });
            }
          }}
        />
        <div id="table"></div>
      </Main>
    </Grommet >
  );
}

export default App;