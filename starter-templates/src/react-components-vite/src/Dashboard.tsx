import { useMemo, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Caption1,
  Card,
  CardHeader,
  Dialog,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Field,
  Input,
  Label,
  ProgressBar,
  Select,
  Slider,
  Switch,
  Tab,
  TabList,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Title1,
  Toolbar,
  ToolbarButton,
  makeStyles,
  shorthands,
  tokens,
  useId,
  Subtitle2,
} from '@fluentui/react-components';
import {
  bundleIcon,
  SearchFilled,
  SearchRegular,
  AddFilled,
  AddRegular,
  FilterFilled,
  FilterRegular,
  ArrowSortFilled,
  ArrowSortRegular,
  PeopleTeamFilled,
  PeopleTeamRegular,
  MoneyFilled,
  MoneyRegular,
  DataBarVerticalFilled,
  DataBarVerticalRegular,
  PanelLeftHeaderFilled,
  PanelLeftHeaderRegular,
  DismissRegular,
  DismissFilled,
} from '@fluentui/react-icons';

const SearchIcon = bundleIcon(SearchFilled, SearchRegular);
const AddIcon = bundleIcon(AddFilled, AddRegular);
const FilterIcon = bundleIcon(FilterFilled, FilterRegular);
const SortIcon = bundleIcon(ArrowSortFilled, ArrowSortRegular);
const TeamIcon = bundleIcon(PeopleTeamFilled, PeopleTeamRegular);
const MrrIcon = bundleIcon(MoneyFilled, MoneyRegular);
const ActivityIcon = bundleIcon(DataBarVerticalFilled, DataBarVerticalRegular);
const PanelIcon = bundleIcon(PanelLeftHeaderFilled, PanelLeftHeaderRegular);
const DismissIcon = bundleIcon(DismissFilled, DismissRegular);

const useStyles = makeStyles({
  appShell: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    gridTemplateRows: 'auto 1fr',
    gridTemplateAreas: `
      "sidebar header"
      "sidebar main"
    `,
    height: '100dvh',
  },
  sidebar: {
    gridArea: 'sidebar',
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRight(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2),
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingHorizontalL,
    padding: tokens.spacingHorizontalL,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  brandBadge: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    width: '36px',
    height: '36px',
    display: 'grid',
    placeItems: 'center',
    fontWeight: tokens.fontWeightSemibold,
  },
  navGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  navLabel: {
    color: tokens.colorNeutralForeground3,
  },
  navButton: {
    justifyContent: 'flex-start',
  },
  headerBar: {
    gridArea: 'header',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderBottom(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: tokens.spacingHorizontalL,
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  searchRow: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
    width: '100%',
    maxWidth: '720px',
  },
  content: {
    gridArea: 'main',
    padding: tokens.spacingHorizontalL,
    overflow: 'auto',
    display: 'grid',
    gap: tokens.spacingHorizontalL,
    gridTemplateRows: 'auto auto 1fr',
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: tokens.spacingHorizontalL,
  },
  kpiCard: {
    gridColumn: 'span 3',
  },
  filtersBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: tokens.spacingHorizontalL,
    alignItems: 'end',
  },
  tableCard: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  tableHeaderRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBlockEnd: tokens.spacingVerticalS,
  },
  tableScroll: {
    overflow: 'auto',
  },
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalS,
  },
  pager: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBlockStart: tokens.spacingVerticalM,
  },
  drawerBody: {
    display: 'grid',
    gap: tokens.spacingVerticalM,
  },
  flexGrow: { flex: 1 },
  gridSpan3: { gridColumn: 'span 3' },
  gridSpan4: { gridColumn: 'span 4' },
  gridSpan2: { gridColumn: 'span 2' },
  endAlign: { display: 'flex', justifyContent: 'flex-end' },
  clickableRow: { cursor: 'pointer' },
  companyCell: { display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS },
  detailsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: tokens.spacingHorizontalL },
  footerActions: { display: 'flex', justifyContent: 'flex-end', gap: tokens.spacingHorizontalS },
  rowGapXS: { display: 'grid', gap: tokens.spacingVerticalXS },
  rowGapM: { display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM },
  gapSRow: { display: 'flex', gap: tokens.spacingHorizontalS },
  responsive: {
    '@media (max-width: 1080px)': {
      gridTemplateColumns: '72px 1fr',
    },
    '@media (max-width: 860px)': {
      gridTemplateAreas: `
        "header header"
        "main main"
      `,
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto 1fr',
    },
  },
});

type Account = {
  id: string;
  company: string;
  owner: string;
  status: 'Active' | 'Churn Risk' | 'Prospect';
  mrr: number;
  createdAt: string; // ISO date
  health: number; // 0-100
};

const sampleData: Account[] = [
  { id: 'A-1001', company: 'Contoso Ltd', owner: 'Deborah', status: 'Active', mrr: 12400, createdAt: '2024-01-18', health: 86 },
  { id: 'A-1002', company: 'Fabrikam', owner: 'Lee', status: 'Prospect', mrr: 0, createdAt: '2024-03-03', health: 48 },
  { id: 'A-1003', company: 'Northwind Traders', owner: 'Jamal', status: 'Active', mrr: 8200, createdAt: '2023-11-09', health: 92 },
  { id: 'A-1004', company: 'Adventure Works', owner: 'Priya', status: 'Churn Risk', mrr: 6100, createdAt: '2023-12-22', health: 34 },
  { id: 'A-1005', company: 'Litware', owner: 'Nora', status: 'Active', mrr: 13900, createdAt: '2024-04-11', health: 75 },
  { id: 'A-1006', company: 'Tailspin Toys', owner: 'Alex', status: 'Prospect', mrr: 0, createdAt: '2024-05-30', health: 57 },
  { id: 'A-1007', company: 'Wingtip', owner: 'Diego', status: 'Active', mrr: 9800, createdAt: '2023-10-04', health: 81 },
  { id: 'A-1008', company: 'Blue Yonder', owner: 'Mina', status: 'Churn Risk', mrr: 5400, createdAt: '2023-09-16', health: 29 },
  { id: 'A-1009', company: 'Wide World Importers', owner: 'Chris', status: 'Active', mrr: 15300, createdAt: '2024-02-07', health: 64 },
  { id: 'A-1010', company: 'Graphic Design Institute', owner: 'Ivy', status: 'Prospect', mrr: 0, createdAt: '2024-06-10', health: 53 },
];

const formatCurrency = (v: number) => new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

const StatusBadge = ({ status }: { status: Account['status'] }) => {
  const color = status === 'Active' ? 'success' : status === 'Churn Risk' ? 'danger' : 'informative';
  return <Badge appearance="filled" color={color as any}>{status}</Badge>;
};

export default function Dashboard() {
  const styles = useStyles();

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Account['status'] | 'All'>('All');
  const [healthMin, setHealthMin] = useState(0);
  const [onlyAssignedToMe, setOnlyAssignedToMe] = useState(false);
  const [sortBy, setSortBy] = useState<'company' | 'mrr' | 'createdAt' | 'health'>('company');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [selected, setSelected] = useState<Account | null>(null);

  const filtered = useMemo(() => {
    let rows = sampleData.slice();
    if (query) {
      const q = query.toLowerCase();
      rows = rows.filter(r => r.company.toLowerCase().includes(q) || r.owner.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
    }
    if (status !== 'All') rows = rows.filter(r => r.status === status);
    if (healthMin > 0) rows = rows.filter(r => r.health >= healthMin);
    if (onlyAssignedToMe) rows = rows.filter(r => r.owner.toLowerCase() === 'alexis');

    rows.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      if (sortBy === 'company') return a.company.localeCompare(b.company) * dir;
      if (sortBy === 'mrr') return (a.mrr - b.mrr) * dir;
      if (sortBy === 'health') return (a.health - b.health) * dir;
      return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * dir;
    });
    return rows;
  }, [query, status, healthMin, onlyAssignedToMe, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const qId = useId('q');

  return (
    <div className={`${styles.appShell} ${styles.responsive}`}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.brandBadge}>B2B</div>
          <Subtitle2>Dashboard</Subtitle2>
        </div>
        <div className={styles.navGroup}>
          <Label className={styles.navLabel}>Overview</Label>
          <Button appearance="transparent" icon={<PanelIcon />} className={styles.navButton}>Home</Button>
          <Button appearance="transparent" icon={<TeamIcon />} className={styles.navButton}>Accounts</Button>
          <Button appearance="transparent" icon={<ActivityIcon />} className={styles.navButton}>Usage</Button>
        </div>
        <div className={styles.navGroup}>
          <Label className={styles.navLabel}>Billing</Label>
          <Button appearance="transparent" icon={<MrrIcon />} className={styles.navButton}>Revenue</Button>
        </div>
      </aside>

      <header className={styles.headerBar}>
        <div className={styles.searchRow}>
          <Field label="Search" htmlFor={qId} className={styles.flexGrow}>
            <Input id={qId} contentBefore={<SearchIcon />} placeholder="Search accounts, owners, or IDs" value={query} onChange={(_, d) => { setQuery(d.value); setPage(1); }} />
          </Field>
          <Toolbar aria-label="actions">
            <ToolbarButton icon={<FilterIcon />} onClick={() => { /* filters visible by default */ }}>
              Filters
            </ToolbarButton>
            <ToolbarButton appearance="primary" icon={<AddIcon />}>New</ToolbarButton>
          </Toolbar>
        </div>
      </header>

      <main className={styles.content}>
        <section className={styles.kpiGrid}>
          <Card className={styles.kpiCard}>
            <CardHeader
              header={<Subtitle2>Active Accounts</Subtitle2>}
              description={<Caption1>Currently billed customers</Caption1>}
              image={<TeamIcon />}
            />
            <Title1>6</Title1>
            <ProgressBar thickness="large" value={60} />
          </Card>
          <Card className={styles.kpiCard}>
            <CardHeader
              header={<Subtitle2>Monthly Recurring Revenue</Subtitle2>}
              description={<Caption1>All active subscriptions</Caption1>}
              image={<MrrIcon />}
            />
            <Title1>{formatCurrency(65700)}</Title1>
            <Caption1>+8% MoM</Caption1>
          </Card>
          <Card className={styles.kpiCard}>
            <CardHeader
              header={<Subtitle2>Churn Risk</Subtitle2>}
              description={<Caption1>Requires attention</Caption1>}
              image={<ActivityIcon />}
            />
            <Title1>2</Title1>
            <ProgressBar color="warning" value={40} />
          </Card>
          <Card className={styles.kpiCard}>
            <CardHeader
              header={<Subtitle2>Prospects</Subtitle2>}
              description={<Caption1>In pipeline</Caption1>}
              image={<AddIcon />}
            />
            <Title1>3</Title1>
            <Caption1>2 added this week</Caption1>
          </Card>
        </section>

        <section className={styles.filtersBar}>
          <Field label="Status" className={styles.gridSpan3}>
            <Select value={status} onChange={(_, d) => { setStatus(d.value as any); setPage(1); }}>
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Churn Risk">Churn Risk</option>
              <option value="Prospect">Prospect</option>
            </Select>
          </Field>
          <Field label={`Min Health: ${healthMin}%`} className={styles.gridSpan4}>
            <Slider value={healthMin} onChange={(_, d) => { setHealthMin(d.value as number); setPage(1); }} step={5} min={0} max={100} />
          </Field>
          <Field label="Assigned to me" className={styles.gridSpan3}>
            <Switch checked={onlyAssignedToMe} onChange={(_, d) => { setOnlyAssignedToMe(!!d.checked); setPage(1); }} />
          </Field>
          <div className={`${styles.gridSpan2} ${styles.endAlign}`}>
            <Button appearance="secondary" icon={<FilterIcon />}>Apply</Button>
          </div>
        </section>

        <Card className={styles.tableCard}>
          <div className={styles.tableHeaderRow}>
            <Subtitle2>Accounts</Subtitle2>
            <TabList
              selectedValue={sortBy}
              onTabSelect={(_, d) => setSortBy(d.value as any)}
              appearance="subtle"
            >
              <Tab icon={<SortIcon />} value="company">Name</Tab>
              <Tab icon={<SortIcon />} value="mrr">MRR</Tab>
              <Tab icon={<SortIcon />} value="health">Health</Tab>
              <Tab icon={<SortIcon />} value="createdAt">Created</Tab>
            </TabList>
          </div>

          <div className={styles.tableHeaderRow}>
            <div />
            <Button size="small" onClick={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')} icon={<SortIcon />}>
              {sortDir === 'asc' ? 'Ascending' : 'Descending'}
            </Button>
          </div>

          <div className={styles.tableScroll}>
            <Table aria-label="Accounts table">
              <TableHeader>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>MRR</TableCell>
                  <TableCell>Health</TableCell>
                  <TableCell>Created</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageRows.map(row => (
                  <TableRow key={row.id} role="row" onClick={() => setSelected(row)} className={styles.clickableRow}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <div className={styles.companyCell}>
                        <Avatar name={row.company} size={24} />
                        {row.company}
                      </div>
                    </TableCell>
                    <TableCell>{row.owner}</TableCell>
                    <TableCell><StatusBadge status={row.status} /></TableCell>
                    <TableCell>{formatCurrency(row.mrr)}</TableCell>
                    <TableCell>
                      <div className={styles.rowGapXS}>
                        <ProgressBar value={row.health} />
                        <Caption1>{row.health}%</Caption1>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className={styles.pager}>
            <Caption1>
              Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filtered.length)} of {filtered.length}
            </Caption1>
            <div className={styles.gapSRow}>
              <Button size="small" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Previous</Button>
              <Button size="small" disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next</Button>
            </div>
          </div>
        </Card>
      </main>

      <Dialog open={!!selected} onOpenChange={(_, d) => d.type === 'close' && setSelected(null)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Account Details</DialogTitle>
            <DialogContent>
              {selected && (
                <div className={styles.drawerBody}>
                  <div className={styles.rowGapM}>
                    <Avatar name={selected.company} size={40} />
                    <div>
                      <Subtitle2>{selected.company}</Subtitle2>
                      <Caption1>{selected.id}</Caption1>
                    </div>
                  </div>
                  <div className={styles.detailsGrid}>
                    <Field label="Owner"><Input readOnly value={selected.owner} /></Field>
                    <Field label="Status"><Input readOnly value={selected.status} /></Field>
                    <Field label="MRR"><Input readOnly value={formatCurrency(selected.mrr)} /></Field>
                    <Field label="Created"><Input readOnly value={new Date(selected.createdAt).toLocaleDateString()} /></Field>
                  </div>
                  <Field label="Health">
                    <ProgressBar value={selected.health} />
                  </Field>
                  <div className={styles.footerActions}>
                    <Button appearance="secondary" onClick={() => setSelected(null)} icon={<DismissIcon />}>Close</Button>
                    <Button appearance="primary">Open Account</Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
}
