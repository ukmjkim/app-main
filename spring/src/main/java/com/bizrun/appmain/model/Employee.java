package com.bizrun.appmain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

@Data
@Entity
@Table(name = "employees")
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class Employee {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "role_id")
    private Long roleId;

    @OneToOne
    @JoinColumn(name = "role_id", insertable = false, updatable = false)
    private Role role;

    @Column(name = "active_yn")
    @Type(type="yes_no")
    private Boolean isActive;

    @JsonIgnore()
    @Column(name = "login_name")
    private String loginName;

    @JsonIgnore()
    @Column(name = "password")
    private String password;
}
