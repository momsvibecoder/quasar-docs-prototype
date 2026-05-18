import { ExternalLink } from 'lucide-react';

const tags = ['latest', 'stable', 'beta', '3.15.7', '3.15', '3.14.2', '3.14'];

const rows = [
  {
    image: 'bureau14/qdb',
    description: 'QuasarDB daemon',
    core2: true,
  },
  {
    image: 'bureau14/qdbsh',
    description: 'QuasarDB shell',
    core2: true,
  },
  {
    image: 'bureau14/qdb-replicate',
    description: 'QuasarDB replication tool',
    core2: true,
  },
  {
    image: 'bureau14/qdb-dashboard',
    description: 'QuasarDB dashboard',
    core2: false,
  },
  {
    image: 'bureau14/qdb-kinesis-connector',
    description: 'QuasarDB Kinesis connector',
    core2: false,
  },
];

export function DockerImagesTable() {
  return (
    <div className="q-docker-table-wrap not-prose">
      <table className="q-docker-images-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Description</th>
            <th>Tags</th>
            <th>Core2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.image}>
              <td>
                <a href={`https://hub.docker.com/r/${row.image}`} target="_blank" rel="noreferrer">
                  {row.image}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </td>
              <td>{row.description}</td>
              <td>
                <ol>
                  {tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ol>
              </td>
              <td>
                {row.core2 ? (
                  <ol>
                    {tags.map((tag) => (
                      <li key={tag}>{tag}-core2</li>
                    ))}
                  </ol>
                ) : (
                  <span className="q-docker-table-na">N/A</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
