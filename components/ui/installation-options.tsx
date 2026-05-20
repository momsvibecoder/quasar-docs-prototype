'use client';

import { useState } from 'react';
import { Callout } from '@/components/ui/callout';
import { CodeBlock } from '@/components/ui/code-block';
import { DockerImagesTable } from '@/components/ui/docker-images-table';

const installTabs = [
  { value: 'docker', label: 'Docker' },
  { value: 'windows', label: 'Windows' },
  { value: 'linux', label: 'Linux' },
];

const linuxTabs = [
  { value: 'debian', label: 'Debian-based' },
  { value: 'rpm', label: 'RPM-based' },
  { value: 'archive', label: 'Other' },
];

function CodeSnippet({ language, children }: { language: string; children: string }) {
  return (
    <CodeBlock>
      <code className={`language-${language}`}>{children.trim()}</code>
    </CodeBlock>
  );
}

function TagsTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Tag</th>
          <th>Description</th>
          <th>QuasarDB version</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>latest</code>
          </td>
          <td>Latest officially supported image</td>
          <td>
            <code>3.15.7</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>beta</code>
          </td>
          <td>Latest beta version</td>
          <td>
            <code>3.15.7</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>stable</code>
          </td>
          <td>Latest stable version</td>
          <td>
            <code>3.14.2</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>3.14</code>
          </td>
          <td>Latest version in the 3.14 branch</td>
          <td>
            <code>3.14.2</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>*-core2</code>
          </td>
          <td>Core2 variant for older CPUs</td>
          <td>
            <code>3.15.7-core2</code>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function EnvTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Variable</th>
          <th>Usage</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>QDB_CLUSTER</code>
          </td>
          <td>Cluster URI</td>
          <td>
            <code>qdb://127.0.0.1:2836</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>QDB_SECURITY_FILE</code>
          </td>
          <td>User security file</td>
          <td>empty</td>
        </tr>
        <tr>
          <td>
            <code>QDB_LOG_LEVEL</code>
          </td>
          <td>Log verbosity</td>
          <td>
            <code>info</code>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function DockerPanel() {
  return (
    <div className="q-install-panel-stack">
      <section>
        <h3>Available images</h3>
        <p>QuasarDB hosts various Docker images on the official docker hub:</p>
        <DockerImagesTable />
      </section>

      <section>
        <h3>Available tags</h3>
        <p>All images follow the same tag format:</p>
        <TagsTable />
      </section>

      <section>
        <h3>Example usage</h3>
        <p>You can use these images to launch a QuasarDB daemon as follows:</p>
        <CodeSnippet language="bash">
          {`
docker run -d --name qdb-server bureau14/qdb
docker run -d -p 40000:40000 --link qdb-server:qdb-server \\
  -e QDB_URI=qdb://qdb-server:2836 bureau14/qdb-dashboard
          `}
        </CodeSnippet>
        <p>
          You can now navigate with your browser to <code>http://localhost:40000/#anonymous</code> to open the
          dashboard.
        </p>
        <p>You can also connect with the QuasarDB shell as follows:</p>
        <CodeSnippet language="bash">
          {`
docker run -ti --link qdb-server:qdb-server bureau14/qdbsh \\
  --cluster qdb://qdb-server:2836

qdbsh >
          `}
        </CodeSnippet>
      </section>

      <section>
        <h3>Environment variables</h3>
        <p>The QuasarDB docker containers provide several environment variables you can use to configure common settings.</p>
        <EnvTable />
      </section>
    </div>
  );
}

function WindowsPanel() {
  return (
    <div className="q-install-panel-stack">
      <section>
        <h3>Windows package installation</h3>
        <ol>
          <li>Download the QuasarDB server installer from the QuasarDB download website.</li>
          <li>Run the setup executable.</li>
          <li>Open the shell and connect to your local cluster.</li>
        </ol>
        <CodeSnippet language="powershell">
          {`
winget install QuasarDB.Server
qdbsh --cluster qdb://127.0.0.1:2836
          `}
        </CodeSnippet>
      </section>
    </div>
  );
}

function LinuxPanel() {
  const [activeLinux, setActiveLinux] = useState('debian');

  return (
    <div className="q-install-panel-stack">
      <section>
        <h3>Linux package installation</h3>
        <div className="q-install-subtabs" role="tablist" aria-label="Linux package type">
          {linuxTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={activeLinux === tab.value}
              onClick={() => setActiveLinux(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeLinux === 'debian' ? (
          <div className="q-install-panel-stack">
            <section>
              <h4>Add repository</h4>
              <p>Add the QuasarDB repository to your apt sources:</p>
              <CodeSnippet language="bash">
                {`
echo "deb [trusted=yes] https://repo.quasar.ai/stable/ /" \\
  | sudo tee /etc/apt/sources.list.d/quasardb.list
apt install apt-transport-https ca-certificates
apt update
                `}
              </CodeSnippet>
              <Callout type="note" title="Tip">
                If you wish to subscribe to a beta release channel, add the beta repository as an additional source.
              </Callout>
            </section>
            <section>
              <h4>Install packages</h4>
              <CodeSnippet language="bash">
                {`
apt search qdb
apt install qdb-server qdb-api qdb-rest qdb-utils
systemctl enable --now quasardb
                `}
              </CodeSnippet>
            </section>
            <section>
              <h4>File locations</h4>
              <table>
                <thead>
                  <tr>
                    <th>Files type</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Configuration files</td>
                    <td>
                      <code>/etc/qdb</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Logs</td>
                    <td>
                      <code>/var/log/qdb</code>
                    </td>
                  </tr>
                  <tr>
                    <td>Database depot</td>
                    <td>
                      <code>/var/lib/qdb</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
        ) : null}

        {activeLinux === 'rpm' ? (
          <div className="q-install-panel-stack">
            <section>
              <h4>Add repository</h4>
              <p>Add the QuasarDB yum repository:</p>
              <CodeSnippet language="bash">
                {`
cat > /etc/yum.repos.d/quasardb.repo <<'EOF'
[quasardb]
name=QuasarDB repo
baseurl=https://repo.quasar.ai/yum/
enabled=1
gpgcheck=0
EOF
yum update
                `}
              </CodeSnippet>
            </section>
            <section>
              <h4>Install packages</h4>
              <CodeSnippet language="bash">
                {`
yum --disablerepo=* --enablerepo=quasardb list available
yum install -y qdb-server qdb-api qdb-rest qdb-utils
                `}
              </CodeSnippet>
            </section>
          </div>
        ) : null}

        {activeLinux === 'archive' ? (
          <div className="q-install-panel-stack">
            <section>
              <h4>Download and extract archives</h4>
              <p>Download QuasarDB tarballs for Linux and extract them into your working directory:</p>
              <CodeSnippet language="bash">
                {`
curl -sS https://download.quasar.ai/quasardb/3.14/3.14.2/server/qdb-3.14.2-linux-64bit-server.tar.gz | tar -xzvf -
curl -sS https://download.quasar.ai/quasardb/3.14/3.14.2/utils/qdb-3.14.2-linux-64bit-utils.tar.gz | tar -xzvf -
ls
bin  examples  include  lib  share
                `}
              </CodeSnippet>
            </section>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export function InstallationOptions() {
  const [active, setActive] = useState('docker');

  return (
    <div className="q-install-options not-prose">
      <div className="q-install-tabs" role="tablist" aria-label="Installation method">
        {installTabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active === tab.value}
            onClick={() => setActive(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="q-install-content" role="tabpanel">
        {active === 'docker' ? <DockerPanel /> : null}
        {active === 'windows' ? <WindowsPanel /> : null}
        {active === 'linux' ? <LinuxPanel /> : null}
      </div>
    </div>
  );
}
