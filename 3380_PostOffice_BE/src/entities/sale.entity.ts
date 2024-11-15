import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Supply } from "./supply.entity";
import { Customers } from "./customer.entity";
import { Employees } from "./employees.entity";

@Entity('sales')
export class Sale {
    @PrimaryGeneratedColumn({ name: 'sale_id' })
    saleId!: number;

    @ManyToOne(() => Supply, (supply) => supply.sales, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'supply_id' })
    supply!: Supply;

    @ManyToOne(() => Customer, (customer) => customer.sales, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer!: Customer;

    @ManyToOne(() => Employee, (employee) => employee.sales, { nullable: false, onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'employee_id' })
    employee!: Employee;

    @CreateDateColumn({ name: 'sale_date' })
    saleDate!: Date;

    @Column({ name: 'quantity', type: 'int', nullable: false })
    quantity!: number;

    @Column({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2, nullable: false })
    totalAmount!: number;
}
