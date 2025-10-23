import { useMemo, useState } from 'react';
import {
  Avatar,
  Button,
  Caption1,
  Card,
  Field,
  Input,
  Label,
  ProgressBar,
  Select,
  Slider,
  Subtitle2,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Title1,
  makeStyles,
  tokens,
  shorthands,
} from '@fluentui/react-components';
import { bundleIcon, SearchFilled, SearchRegular, FilterFilled, FilterRegular } from '@fluentui/react-icons';
import { Account, sampleData } from '../data/accounts';

const SearchIcon = bundleIcon(SearchFilled, SearchRegular);
const FilterIcon = bundleIcon(FilterFilled, FilterRegular);

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gap: tokens.spacingHorizontalL,
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filters: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: tokens.spacingHorizontalL,
    alignItems: 'end',
  },
  gridSpan3: { gridColumn: 'span 3' },
  gridSpan4: { gridColumn: 'span 4' },
  endAlign: { display: 'flex', justifyContent: 'flex-end' },
  tableCard: {
    display: 'flex',
    flexDirection: 'column',
  },
  tableScroll: {
    overflow: 'auto',
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  toolbar: { display: 'flex', gap: tokens.spacingHorizontalS },
  companyCell: { display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS },
  rowGapXS: { display: 'grid', gap: tokens.spacingVerticalXS },
});

export default function Accounts() {
  const styles = useStyles();

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Account['status'] | 'All'>('All');
  const [healthMin, setHealthMin] = useState(0);

  const filtered = useMemo(() => {
    let rows = sampleData.slice();
    if (query) {
      const q = query.toLowerCase();
      rows = rows.filter(
        r => r.company.toLowerCase().includes(q) || r.owner.toLowerCase().includes(q) || r.id.toLowerCase().includes(q),
      );
    }
    if (status !== 'All') rows = rows.filter(r => r.status === status);
    if (healthMin > 0) rows = rows.filter(r => r.health >= healthMin);
    return rows;
  }, [query, status, healthMin]);

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <Title1>Accounts</Title1>
        <div className={styles.toolbar}>
          <Button appearance="secondary" icon={<FilterIcon />}>
            Export CSV
          </Button>
          <Button appearance="primary">New Account</Button>
        </div>
      </div>

      <div className={styles.filters}>
        <Field label="Search" className={styles.gridSpan4}>
          <Input
            contentBefore={<SearchIcon />}
            placeholder="Search accounts"
            value={query}
            onChange={(_, d) => setQuery(d.value)}
          />
        </Field>
        <Field label="Status" className={styles.gridSpan3}>
          <Select value={status} onChange={(_, d) => setStatus(d.value as any)}>
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Churn Risk">Churn Risk</option>
            <option value="Prospect">Prospect</option>
          </Select>
        </Field>
        <Field label={`Min Health: ${healthMin}%`} className={styles.gridSpan4}>
          <Slider value={healthMin} onChange={(_, d) => setHealthMin(d.value as number)} step={5} min={0} max={100} />
        </Field>
        <div className={`${styles.gridSpan3} ${styles.endAlign}`}>
          <Button appearance="secondary" icon={<FilterIcon />}>
            Apply
          </Button>
        </div>
      </div>

      <Card className={styles.tableCard}>
        <div className={styles.tableScroll}>
          <Table aria-label="Accounts list">
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
              {filtered.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <div className={styles.companyCell}>
                      <Avatar name={row.company} size={24} />
                      {row.company}
                    </div>
                  </TableCell>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell>
                    <Label>{row.status}</Label>
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat(undefined, {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(row.mrr)}
                  </TableCell>
                  <TableCell>
                    <div className={styles.rowGapXS}>
                      <ProgressBar value={row.health} max={100} />
                      <Caption1>{row.health}%</Caption1>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
