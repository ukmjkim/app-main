package com.bizrun.appmain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "customers")
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class Customer {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "mobile_phone")
    private String mobilePhone;

    @Column(name = "home_phone")
    private String homePhone;

    @Column(name = "office_phone")
    private String officePhone;

    @Column(name = "email")
    private String email;

    @Column(name = "created_dt")
    private Timestamp createdDateTime;
}
