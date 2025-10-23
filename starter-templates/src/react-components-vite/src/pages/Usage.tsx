import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Caption1,
  Card,
  CardHeader,
  Field,
  Input,
  Select,
  Slider,
  Subtitle2,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Title1,
  ProgressBar,
  makeStyles,
  tokens,
  shorthands,
} from '@fluentui/react-components';
import { bundleIcon, SearchFilled, SearchRegular, DataBarVerticalFilled, DataBarVerticalRegular, FilterFilled, FilterRegular } from '@fluentui/react-icons';
import { sampleData } from '../data/accounts';

const SearchIcon = bundleIcon(SearchFilled, SearchRegular);
const ActivityIcon = bundleIcon(DataBarVerticalFilled, DataBarVerticalRegular);
const FilterIcon = bundleIcon(FilterFilled, FilterRegular);

const useStyles = makeStyles({
  container: { display: 'grid', gap: tokens.spacingHorizontalL },
  headerRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: tokens.spacingHorizontalL },
  kpiCard: { gridColumn: 'span 4' },
  filters: { display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: tokens.spacingHorizontalL, alignItems: 'end' },
  gridSpan3: { gridColumn: 'span 3' },
  gridSpan4: { gridColumn: 'span 4' },
  gridSpan2: { gridColumn: 'span 2' },
  endAlign: { display: 'flex', justifyContent: 'flex-end' },
  tableCard: { display: 'flex', flexDirection: 'column' },
  tableScroll: { overflow: 'auto', ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2), ...shorthands.borderRadius(tokens.borderRadiusMedium) },
});

type UsageRow = {
  id: string; // account id
  product: 'Core' | 'Analytics' | 'Billing';
  events: number; // total events in range
  avgPerDay: number;
  lastActive: string; // ISO date
};

const usageSample: UsageRow[] = [
  { id: 'A-1001', product: 'Core', events: 12500, avgPerDay: 410, lastActive: '2024-06-11' },
  { id: 'A-1003', product: 'Analytics', events: 8300, avgPerDay: 270, lastActive: '2024-06-10' },
  { id: 'A-1005', product: 'Core', events: 15400, avgPerDay: 513, lastActive: '2024-06-11' },
  { id: 'A-1007', product: 'Billing', events: 4300, avgPerDay: 143, lastActive: '2024-06-09' },
  { id: 'A-1009', product: 'Analytics', events: 9800, avgPerDay: 327, lastActive: '2024-06-11' },
  { id: 'A-1004', product: 'Core', events: 1200, avgPerDay: 39, lastActive: '2024-06-05' },
];

export default function Usage() {
  const styles = useStyles();

  const [query, setQuery] = useState('');
  const [product, setProduct] = useState<'All' | UsageRow['product']>('All');
  const [minAvg, setMinAvg] = useState(0);

  const rows = useMemo(() => {
    const index = new Map(sampleData.map(a => [a.id, a.company] as const));
    let list = usageSample
      .filter(r => (product === 'All' ? true : r.product === product))
      .filter(r => r.avgPerDay >= minAvg)
      .filter(r => {
        if (!query) return true;
        const company = index.get(r.id) || '';
        const q = query.toLowerCase();
        return r.id.toLowerCase().includes(q) || company.toLowerCase().includes(q) || r.product.toLowerCase().includes(q);
      })
      .map(r => ({ ...r, company: index.get(r.id) || r.id }));
    return list;
  }, [query, product, minAvg]);

  const totalEvents = rows.reduce((s, r) => s + r.events, 0);
  const activeAccounts = rows.length;
  const avgDaily = rows.reduce((s, r) => s + r.avgPerDay, 0);
  const maxAvg = Math.max(1, ...rows.map(r => r.avgPerDay));

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <Title1>Usage</Title1>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalS }}>
          <Button appearance="secondary" icon={<FilterIcon />}>Export CSV</Button>
          <Button appearance="primary">Create Report</Button>
        </div>
      </div>

      <section className={styles.kpiGrid}>
        <Card className={styles.kpiCard}>
          <CardHeader header={<Subtitle2>Total Events</Subtitle2>} description={<Caption1>In selected range</Caption1>} image={<ActivityIcon />} />
          <Title1>{new Intl.NumberFormat().format(totalEvents)}</Title1>
        </Card>
        <Card className={styles.kpiCard}>
          <CardHeader header={<Subtitle2>Active Accounts</Subtitle2>} description={<Caption1>With activity</Caption1>} image={<ActivityIcon />} />
          <Title1>{activeAccounts}</Title1>
        </Card>
        <Card className={styles.kpiCard}>
          <CardHeader header={<Subtitle2>Avg Daily Events</Subtitle2>} description={<Caption1>Across results</Caption1>} image={<ActivityIcon />} />
          <Title1>{new Intl.NumberFormat().format(avgDaily)}</Title1>
        </Card>
      </section>

      <div className={styles.filters}>
        <Field label="Search" className={styles.gridSpan4}>
          <Input contentBefore={<SearchIcon />} placeholder="Search company, id or product" value={query} onChange={(_, d) => setQuery(d.value)} />
        </Field>
        <Field label="Product" className={styles.gridSpan3}>
          <Select value={product} onChange={(_, d) => setProduct(d.value as any)}>
            <option value="All">All</option>
            <option value="Core">Core</option>
            <option value="Analytics">Analytics</option>
            <option value="Billing">Billing</option>
          </Select>
        </Field>
        <Field label={`Min Avg/Day: ${minAvg}`} className={styles.gridSpan3}>
          <Slider value={minAvg} onChange={(_, d) => setMinAvg(d.value as number)} min={0} max={600} step={10} />
        </Field>
        <div className={`${styles.gridSpan2} ${styles.endAlign}`}>
          <Button appearance="secondary" icon={<FilterIcon />}>Apply</Button>
        </div>
      </div>

      <Card className={styles.tableCard}>
        <div className={styles.tableScroll}>
          <Table aria-label="Usage by account">
            <TableHeader>
              <TableRow>
                <TableCell>Account</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Events</TableCell>
                <TableCell>Avg/Day</TableCell>
                <TableCell>Activity</TableCell>
                <TableCell>Last Active</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(r => (
                <TableRow key={`${r.id}-${r.product}`}>
                  <TableCell>{r.company}</TableCell>
                  <TableCell><Badge>{r.product}</Badge></TableCell>
                  <TableCell>{new Intl.NumberFormat().format(r.events)}</TableCell>
                  <TableCell>{new Intl.NumberFormat().format(r.avgPerDay)}</TableCell>
                  <TableCell>
                    <ProgressBar value={Math.round((r.avgPerDay / maxAvg) * 100)} max={100} />
                  </TableCell>
                  <TableCell>{new Date(r.lastActive).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
